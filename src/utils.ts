import * as yup from "yup";


export function isRequired(schema: yup.AnyObjectSchema, name:string) : boolean {
    if (!schema) {
      return false;
    }
    const field = schema.fields[name];
    if (field.tests.length === 0) {
      return false;
    }
    return field.tests.some((tt:any) => tt.OPTIONS.name === "required");
  }
  