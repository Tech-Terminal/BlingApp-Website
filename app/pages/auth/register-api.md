# Public API contract: client registration

**Audience:** Frontend (Nuxt BFF or direct client)  
**App:** Public Consumer API (`public-api`)  
**Global prefix:** `/api`  
**Base URL (local):** `http://localhost:{PUBLIC_PORT}/api`  
**Content-Type:** `application/json`  
**Auth:** Both routes are public. Do **not** send `Authorization`.

These two endpoints complete signup:

1. `POST /api/auth/register` — start registration, send OTP
2. `POST /api/auth/verify-register-otp` — verify OTP and create the client session

The account is **not** written to the database until step 2 succeeds.

---

## Shared response envelope

All successful responses:

```json
{
  "success": true,
  "statusCode": 201,
  "message": "<Arabic success message>",
  "data": {}
}
```

All error responses:

```json
{
  "success": false,
  "statusCode": 422,
  "message": "<first error or summary>",
  "errors": {},
  "data": null
}
```

| Kind                       | `statusCode` | `errors` shape                                          |
| -------------------------- | ------------ | ------------------------------------------------------- |
| DTO validation             | `422`        | Field keys → string arrays, e.g. `{ "phone": ["..."] }` |
| Business / OTP             | `400`        | `{ "general": ["..."] }`                                |
| Rate limit (register only) | `429`        | `{ "general": ["..."] }`                                |
| Unexpected                 | `500`        | `{ "general": ["..."] }`                                |

Extra JSON body fields are **stripped** (`whitelist: true`). They do not cause an error.

CORS is enabled. No custom headers are required beyond `Content-Type: application/json`.

---

## API 1 — Register client (send OTP)

### 1. Overview

|                |                                                                                                                             |
| -------------- | --------------------------------------------------------------------------------------------------------------------------- |
| **Name**       | Register client / send registration OTP                                                                                     |
| **Purpose**    | Validate name + phone, ensure phone is unused, store a 10-minute OTP session in Redis. Does **not** create a `clients` row. |
| **Method**     | `POST`                                                                                                                      |
| **Path**       | `/api/auth/register`                                                                                                        |
| **Auth**       | None (public)                                                                                                               |
| **Headers**    | `Content-Type: application/json`                                                                                            |
| **Rate limit** | Yes — see below                                                                                                             |

**Behavior notes**

- OTP is a 6-digit numeric string (`100000`–`999999`).
- OTP session TTL is **10 minutes**, keyed by the exact `phone` string.
- Calling register again for the same phone **overwrites** the previous OTP/session (as long as uniqueness and throttle pass).
- **Current backend returns the OTP in `data.otp`.** Treat this as a development aid. SMS is not wired yet. Do not depend on this field remaining in production.
- Name is stored only in the Redis session until verify succeeds.

**Throttling** (per client IP, Nest throttler):

| Window     | Max requests |
| ---------- | ------------ |
| 10 seconds | 1            |
| 1 minute   | 3            |
| 15 minutes | 5            |

Exceeding any window returns **429**.

### 2. Request shape

No query or path parameters.

**Body**

| Field   | Type     | Required | Default | Allowed values                                                     |
| ------- | -------- | -------- | ------- | ------------------------------------------------------------------ |
| `name`  | `string` | yes      | —       | any string, min length 2                                           |
| `phone` | `string` | yes      | —       | any string, min length 8; must be unique among non-deleted clients |

There is **no** email, password, OTP, or locale field on this endpoint.

Example:

```json
{
  "name": "Aml walaed",
  "phone": "+96555520346"
}
```

### 3. Validation rules

| Field              | Rules                                                                                                                      |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------- |
| `name`             | Required. Must be a string. Min length **2**. Message: `يجب أن يكون الاسم نصاً` / `يجب ألا يقل الاسم عن حرفين`             |
| `phone`            | Required. Must be a string. Min length **8**. Message: `يجب أن يكون رقم الهاتف نصاً` / `يجب ألا يقل رقم الهاتف عن 8 أرقام` |
| `phone` uniqueness | Must not exist on `clients.phone` where `deletedAt IS NULL`. Message: `رقم الهاتف مسجل مسبقاً`                             |

**Not validated today**

- Phone is **not** checked as E.164 / Kuwait format. Send the same string you will send on verify (recommended: `+965…`).
- No max length.
- No email / date / URL / enum fields.
- No nullable body fields; missing `name` or `phone` fails validation.
- No conditional fields.

Soft-deleted clients do **not** block uniqueness. An active or non-deleted row with the same phone **does**.

### 4. Success response

HTTP **201** (Nest default for `POST`).

`message`: `تم إرسال رمز التحقق بنجاح`

```json
{
  "success": true,
  "statusCode": 201,
  "message": "تم إرسال رمز التحقق بنجاح",
  "data": {
    "otp": "482193"
  }
}
```

| Field      | Type     | Notes                                                                  |
| ---------- | -------- | ---------------------------------------------------------------------- |
| `data.otp` | `string` | 6-digit OTP. Temporary; expect this to be removed when SMS is enabled. |

### 5. Error responses

**422 — validation**

```json
{
  "success": false,
  "statusCode": 422,
  "message": "يجب ألا يقل الاسم عن حرفين",
  "errors": {
    "name": ["يجب ألا يقل الاسم عن حرفين"]
  },
  "data": null
}
```

```json
{
  "success": false,
  "statusCode": 422,
  "message": "رقم الهاتف مسجل مسبقاً",
  "errors": {
    "phone": ["رقم الهاتف مسجل مسبقاً"]
  },
  "data": null
}
```

Multiple field errors: `message` is the first constraint plus `(and N more error(s))`; `errors` lists all fields.

**429 — throttled**

Retry after the window. Typical message comes from Nest throttler (`ThrottlerException`).

**401 / 403**

Should **not** occur if the path is exactly `/api/auth/register`. Any other path is treated as protected.

---

## API 2 — Verify register OTP (create account)

### 1. Overview

|                |                                                               |
| -------------- | ------------------------------------------------------------- |
| **Name**       | Verify registration OTP / create client                       |
| **Purpose**    | Confirm the OTP from step 1, insert the client, return tokens |
| **Method**     | `POST`                                                        |
| **Path**       | `/api/auth/verify-register-otp`                               |
| **Auth**       | None (public). Tokens are **returned**, not required.         |
| **Headers**    | `Content-Type: application/json`                              |
| **Rate limit** | None on this route                                            |

**Behavior notes**

- Looks up Redis key `client-register-otp:{phone}` using the **exact** `phone` string from register.
- OTP compare is **strict string equality**.
- On success:
  1. If no client exists for that phone → create `{ name, phone, isActive: true }` (`name` comes from the Redis session, not from this request).
  2. If a client already exists → skip insert and issue tokens for that row.
  3. Delete the Redis OTP session (one-time use).
  4. Issue JWT access token + opaque refresh token.
- **Name cannot be changed on this call.** Only `phone` + `otp`.
- A second verify with the same OTP fails with 400 (session already deleted).
- Expired / never-registered phone: same 400 as invalid session (`Invalid or expired OTP. Please restart registration.`). Frontend should send the user back to register.

**Tokens**

| Token          | Format                                                                      | Default TTL                             |
| -------------- | --------------------------------------------------------------------------- | --------------------------------------- |
| `accessToken`  | JWT, signed with full client payload (no `password` field exists on client) | `JWT_EXPIRES_IN` (default `1h`)         |
| `refreshToken` | 80-char hex (`crypto.randomBytes(40)`) stored in Redis                      | `JWT_REFRESH_EXPIRES_IN` (default `7d`) |

Use `Authorization: Bearer <accessToken>` on subsequent **protected** public routes (`/api/auth/me`, addresses, etc.).

### 2. Request shape

No query or path parameters.

**Body** (`VerifyOtpDto` — same DTO as login OTP verify)

| Field   | Type     | Required | Default | Allowed values                                        |
| ------- | -------- | -------- | ------- | ----------------------------------------------------- |
| `phone` | `string` | yes      | —       | min length 8; must match the register `phone` exactly |
| `otp`   | `string` | yes      | —       | min length 6; must match the OTP from register        |

Example:

```json
{
  "phone": "+96555520346",
  "otp": "482193"
}
```

### 3. Validation rules

| Field   | Rules                                                                                                             |
| ------- | ----------------------------------------------------------------------------------------------------------------- |
| `phone` | Required. String. Min length **8**. Messages: `يجب أن يكون رقم الهاتف نصاً` / `يجب ألا يقل رقم الهاتف عن 8 أرقام` |
| `otp`   | Required. String. Min length **6**. Messages: `يجب أن يكون رمز التحقق نصاً` / `رمز التحقق يجب أن يكون 6 أرقام`    |

**Not validated on the DTO**

- OTP is not restricted to digits-only at validation time (service generates digits only).
- No max length on `otp` (generated value is always length 6).
- No uniqueness check on this endpoint.
- No enums, email, date, or URL formats.
- No nullable / conditional fields.

**Service rules (after DTO passes)**

| Condition                                                                  | HTTP  | Message                                                |
| -------------------------------------------------------------------------- | ----- | ------------------------------------------------------ |
| No Redis session for this phone (missing, expired 10 min, or already used) | `400` | `Invalid or expired OTP. Please restart registration.` |
| Session exists but `otp` does not match                                    | `400` | `Invalid OTP.`                                         |

### 4. Success response

HTTP **201**.

`message`: `تم إنشاء الحساب بنجاح`

```json
{
  "success": true,
  "statusCode": 201,
  "message": "تم إنشاء الحساب بنجاح",
  "data": {
    "client": {
      "id": 1,
      "name": "Aml walaed",
      "email": null,
      "phone": "+96555520346",
      "image": null,
      "isActive": true,
      "createdAt": "2026-09-22T16:00:00.000Z",
      "updatedAt": "2026-09-22T16:00:00.000Z",
      "deletedAt": null
    },
    "accessToken": "<jwt>",
    "refreshToken": "<80-char hex>"
  }
}
```

**`data.client` fields**

| Field       | Type                | Nullable | Notes                      |
| ----------- | ------------------- | -------- | -------------------------- |
| `id`        | `number`            | no       | Auto-increment             |
| `name`      | `string`            | no       | From register session      |
| `email`     | `string \| null`    | yes      | Not collected in this flow |
| `phone`     | `string`            | no       | Same as request            |
| `image`     | `string \| null`    | yes      | Not collected in this flow |
| `isActive`  | `boolean`           | no       | Always `true` on create    |
| `createdAt` | `string` (ISO date) | no       |                            |
| `updatedAt` | `string` (ISO date) | no       |                            |
| `deletedAt` | `string \| null`    | yes      | `null` for new clients     |
| `addresses` | omitted             | —        | Relation not loaded        |

Frontend should persist `accessToken` and `refreshToken` after this response. Do not show a second “create account” screen; the user is already signed in.

### 5. Error responses

**422 — DTO**

```json
{
  "success": false,
  "statusCode": 422,
  "message": "رمز التحقق يجب أن يكون 6 أرقام",
  "errors": {
    "otp": ["رمز التحقق يجب أن يكون 6 أرقام"]
  },
  "data": null
}
```

**400 — expired / missing session**

```json
{
  "success": false,
  "statusCode": 400,
  "message": "Invalid or expired OTP. Please restart registration.",
  "errors": {
    "general": ["Invalid or expired OTP. Please restart registration."]
  },
  "data": null
}
```

**400 — wrong OTP**

```json
{
  "success": false,
  "statusCode": 400,
  "message": "Invalid OTP.",
  "errors": {
    "general": ["Invalid OTP."]
  },
  "data": null
}
```

---

## Recommended frontend flow

```
[Name + phone form]
        │
        ▼
POST /api/auth/register
        │
        ├─ 422 phone unique → “already registered” → send to login
        ├─ 429 → wait / disable submit
        └─ 201 → OTP screen (dev: can prefill data.otp)
                │
                ▼
        POST /api/auth/verify-register-otp
                │
                ├─ 400 expired → back to register
                ├─ 400 invalid OTP → stay on OTP, show error
                └─ 201 → store tokens, go to app
```

**BFF note:** Browser should call Nuxt (`POST /api/auth/register` and `POST /api/auth/verify-register-otp` on the Nuxt origin). Nitro should proxy to these Nest paths with `NUXT_BACKEND_BASE` (e.g. `http://localhost:5100/api`). Do not point the browser at Nest for these calls if you use BFF.

**Related (not in this contract)**

| If you need                      | Use                                                                                |
| -------------------------------- | ---------------------------------------------------------------------------------- |
| Resend the same registration OTP | `POST /api/auth/resend-otp` `{ "phone": "..." }` (public, throttled like register) |
| Login existing client            | `POST /api/auth/sign-in` then `POST /api/auth/verify-login-otp`                    |
