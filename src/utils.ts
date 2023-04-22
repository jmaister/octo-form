import * as yup from "yup";
//import { SchemaDescription, SchemaInnerTypeDescription, SchemaObjectDescription } from "yup/lib/schema";
//import { ExtraParams } from "yup";

export type Size = "small" | "normal" | "large" | undefined;

export function findTest(fieldName: string, schema: yup.ISchema<any>, testName: string): (any | undefined) {
    const desc:any = schema.describe();

    const t = typeof desc;

    // Assume that the field name of an object with only one level. i.e. "items.2.description"
    if (fieldName.indexOf(".") > 0) {
        const parts = fieldName.split(".");
        const arrayField = desc.fields[parts[0]] as yup.SchemaInnerTypeDescription;
        if (arrayField == null) {
            console.warn(`${fieldName} is not defined in the Yup schema. Consider defining it.`);
            return;
        }
        const innerType = arrayField.innerType as yup.SchemaObjectDescription;
        const field = innerType.fields[parts[2]] as yup.SchemaDescription;
        if (field == null) {
            console.warn(`${fieldName} is not defined in the Yup schema. Consider defining it.`);
            return;
        }
        return field.tests.find((tt: any) => tt.name === testName);
    }

    const field = desc.fields[fieldName] as yup.SchemaDescription;
    if (field == null) {
        console.warn(`${fieldName} is not defined in the Yup schema. Consider defining it.`);
        return;
    }
    return field.tests.find((tt: any) => tt.name === testName);
}

export function findParamNumber(fieldName: string, schema: yup.AnyObjectSchema, testName: string, paramName: string): number {
    const test = findTest(fieldName, schema, testName);
    if (test) {
        return getNumberParam(test, paramName);
    }
    throw new Error(`Field "${fieldName}": Add parameter "${testName}(...)" to the yup schema`);
}

function getNumberParam(extra: (any | undefined), paramName: string): number {
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

export function isRequired(schema: yup.ISchema<any>, name: string): boolean {
    return findTest(name, schema, "required") != null;
}

export function sizeToClassName(size: Size): string {
    switch (size) {
        case "small":
            return "form-control-sm";
        case "large":
            return "form-control-lg";
        default:
            return "";
    }
}

export function sizeToClassNameDropdown(size: Size): string {
    switch (size) {
        case "small":
            return "form-select-sm";
        case "large":
            return "form-select-lg mb-3";
        default:
            return "";
    }
}

export function randomId() {
    return "id__" + Math.random().toString(36);
}