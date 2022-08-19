import * as yup from "yup";
import { SchemaDescription } from "yup/lib/schema";
import { ExtraParams } from "yup/lib/types";


export function findTest(fieldName:string, schema:yup.AnyObjectSchema, testName:string) : (ExtraParams | undefined) {
  const desc = schema.describe();
  const field = desc.fields[fieldName] as SchemaDescription;

  return field.tests.find((tt:any) => tt.name === testName);
}

export function findParamNumber(fieldName:string, schema:yup.AnyObjectSchema, testName:string, paramName:string) : number {
    const test = findTest(fieldName, schema, testName);
    if (test) {
      return getNumberParam(test, paramName);
    }
    throw new Error(`Field "${fieldName}": Add parameter "${testName}(...)" to the yup schema`);
}

function getNumberParam(extra:(ExtraParams | undefined), paramName:string) : number {
    if (!extra) {
      throw new Error("yup.min() is required");
    }
    if (extra.params != null) {
        const p = extra.params as any;
        if (p.hasOwnProperty(paramName)) {
          return p[paramName] as number;
        }
    }
    return 0;
}

export function isRequired(schema: yup.AnyObjectSchema, name:string) : boolean {
  return findTest(name, schema, "required") != null;
}