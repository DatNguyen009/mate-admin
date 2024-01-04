import * as yup from "yup";

export const schemaErrorMessages = {
  required: "Trường này bắt buộc",
  number: "Vui lòng nhập số",
  phoneNumber: "Vui lòng nhập đúng số điện thoại",
  email: "Vui lòng nhập đúng email",
  lowercase: "Vui lòng nhập chữ viết thường",
  uppercase: "Vui lòng nhập chữ viết hoa",
};

//Type number
const numberSchemaIsNumber = yup
  .number()
  .transform((val, originVal) => {
    if (!originVal) return null;
    return val;
  })
  .nullable(true)
  .typeError(schemaErrorMessages.number);

// const phoneNumberSchema = yup
//   .number()
//   .test("text", "Item Group is not exist", value => {
//     const regex =
//       /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;
//     const result = regex.test(value);
//     return result;
//   });

//Type Sring
const stringSchemaEmail = yup.string().email(schemaErrorMessages.email);
const stringSchemaLowercase = yup
  .string()
  .lowercase(schemaErrorMessages.lowercase);
const stringSchemaUppercase = yup
  .string()
  .uppercase(schemaErrorMessages.uppercase);

export const DATA_SCHEMA_VALIDATION = {
  string: [
    {
      text: "Email",
      code: "EMAIL",
      value: stringSchemaEmail,
    },
    {
      text: "Lowercase",
      code: "LOWERCASE",
      value: stringSchemaLowercase,
    },
    {
      text: "Uppercase",
      code: "UPPERCASE",
      value: stringSchemaUppercase,
    },
  ],
  number: [
    {
      text: "Is Number",
      code: "IS_NUMBER",
      value: numberSchemaIsNumber,
    },
    // {
    //   text: "Is PhoneNumber",
    //   code: "IS_PHONENUMBER",
    //   value: phoneNumberSchema,
    // },
  ],
};
