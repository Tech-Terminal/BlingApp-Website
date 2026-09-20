import * as yup from "yup";
import type { Message } from "yup";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import type { Translate } from "./locale";

declare module "yup" {
  interface StringSchema {
    phone(): this;
    kuwaitPhone(message?: Message): this;
  }
}

// Requires a dot-separated TLD of at least 2 characters, e.g. name@example.com.
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const applyYupMethods = (t: Translate) => {
  yup.addMethod(
    yup.string,
    "email",
    function email(this: yup.StringSchema, message) {
      return this.matches(EMAIL_REGEX, {
        name: "email",
        message: message ?? (() => t("validation.email")),
        excludeEmptyString: true,
      });
    },
  );

  yup.addMethod(
    yup.string,
    "phone",
    function phone(this: yup.StringSchema, message) {
      return this.test(
        "phone",
        message ?? (() => t("validation.phone")),
        (value) => {
          if (!value) return true;
          try {
            const phoneNumber = parsePhoneNumberFromString(value);

            return phoneNumber?.isValid() ?? false;
          } catch {
            return false;
          }
        },
      );
    },
  );

  yup.addMethod(
    yup.string,
    "kuwaitPhone",
    function kuwaitPhone(this: yup.StringSchema, message?: Message) {
      return this.test(
        "kuwaitPhone",
        message ?? (() => t("validation.kuwaitPhone")),
        (value) => {
          if (!value) return true;
          try {
            const phoneNumber = parsePhoneNumberFromString(value, "KW");

            return phoneNumber?.isValid() ?? false;
          } catch {
            return false;
          }
        },
      );
    },
  );
};
