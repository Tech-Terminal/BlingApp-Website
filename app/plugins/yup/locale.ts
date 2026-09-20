import { setLocale } from "yup";
import type { LocaleObject } from "yup";

export type Translate = (
  key: string,
  params?: Record<string, string | number | boolean>,
) => string;

const formatList = (value: unknown) => {
  if (Array.isArray(value)) {
    return value.map(String).join(", ");
  }

  return String(value);
};

export const applyYupLocale = (t: Translate) => {
  const locale: LocaleObject = {
    mixed: {
      default: () => t("validation.invalid"),
      required: () => t("validation.required"),
      defined: () => t("validation.defined"),
      notNull: () => t("validation.notNull"),
      oneOf: ({ values }) => t("validation.oneOf", { values: values }),
      notOneOf: ({ values }) => t("validation.notOneOf", { values: values }),
      notType: () => t("validation.notType"),
    },
    string: {
      length: ({ length }) => t("validation.stringLength", { length }),
      min: ({ min }) => t("validation.stringMin", { min }),
      max: ({ max }) => t("validation.stringMax", { max }),
      matches: () => t("validation.matches"),
      email: () => t("validation.email"),
      url: () => t("validation.url"),
      uuid: () => t("validation.uuid"),
      datetime: () => t("validation.datetime"),
      datetime_offset: () => t("validation.datetimeOffset"),
      datetime_precision: ({ precision }) =>
        t("validation.datetimePrecision", { precision }),
      trim: () => t("validation.trim"),
      lowercase: () => t("validation.lowercase"),
      uppercase: () => t("validation.uppercase"),
    },
    number: {
      min: ({ min }) => t("validation.numberMin", { min }),
      max: ({ max }) => t("validation.numberMax", { max }),
      lessThan: ({ less }) => t("validation.lessThan", { less }),
      moreThan: ({ more }) => t("validation.moreThan", { more }),
      positive: () => t("validation.positive"),
      negative: () => t("validation.negative"),
      integer: () => t("validation.integer"),
    },
    date: {
      min: ({ min }) => t("validation.dateMin", { min: String(min) }),
      max: ({ max }) => t("validation.dateMax", { max: String(max) }),
    },
    boolean: {
      isValue: ({ value }) =>
        t("validation.booleanValue", { value: String(value) }),
    },
    object: {
      noUnknown: ({ unknown }) =>
        t("validation.noUnknown", { unknown: formatList(unknown) }),
      exact: ({ properties }) =>
        t("validation.objectExact", {
          properties: formatList(properties),
        }),
    },
    array: {
      min: ({ min }) => t("validation.arrayMin", { min }),
      max: ({ max }) => t("validation.arrayMax", { max }),
      length: ({ length }) => t("validation.arrayLength", { length }),
    },
  };

  setLocale(locale);
};
