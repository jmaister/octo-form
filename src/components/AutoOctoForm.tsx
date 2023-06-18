import { useMemo } from "react";

import { OctoForm, OnSubmitFnType } from "../OctoForm";
import * as yup from "yup";
import { FieldValues } from "react-hook-form";
import { FormInputText } from "./FormInputText";
import { SubmitButton } from "../extra/SubmitButton";

export type AutoOctoFormProps<T extends FieldValues> = {
    jsonSchema: any;
    defaultValues: T;
    onSubmit: OnSubmitFnType<T>;
};

export default function AutoOctoForm<T extends FieldValues>({ jsonSchema, defaultValues, onSubmit }: AutoOctoFormProps<T>) {

    const yupSchema = useMemo(() => fromJsonSchema(jsonSchema), [jsonSchema]);
    const view = useMemo(() => formFromJsonSchema(jsonSchema), [jsonSchema]);

    return <OctoForm schema={yupSchema} defaultValues={defaultValues} onSubmit={onSubmit}>
        {view}
        <div style={{textAlign: "right"}}>
            <SubmitButton />
        </div>
    </OctoForm>
}

const fromJsonSchema = (jsonSchema: any) : yup.ObjectSchema<any> => {
    if (jsonSchema.type === "object") {
        const properties:any = {};
        Object.entries(jsonSchema.properties).forEach(([key, value]) => {
            properties[key] = _fromJsonSchema(value);
        });
        return yup.object(properties);
    } else {
        throw new Error(`Unsupported type: ${jsonSchema.type}`);
    }
}

const _fromJsonSchema = (jsonSchema: any) : any => {
    if (jsonSchema.type === "object") {
        const properties:any = {};
        Object.entries(jsonSchema.properties).forEach(([key, value]) => {
            properties[key] = _fromJsonSchema(value);
        });
        return yup.object().shape(properties);
    } else if (jsonSchema.type === "string") {
        return yup.string();
    } else if (jsonSchema.type === "integer") {
        console.log("integer");
        return yup.number().integer("Nooop").label(jsonSchema.title || jsonSchema.key);
    } else if (jsonSchema.type === "number") {
        return yup.number();
    } else if (jsonSchema.type === "boolean") {
        return yup.boolean();
    } else {
        throw new Error(`Unsupported type: ${jsonSchema.type}`);
    }
};

const formFromJsonSchema = (jsonSchema: any) : JSX.Element[] => {
    if (jsonSchema.type === "object") {
        const properties = Object.entries(jsonSchema.properties).map(([key, value]) => {
            return _formFromJsonSchema(key, value);
        });
        return properties;
    } else {
        throw new Error(`Unsupported type: ${jsonSchema.type}`);
    }
}

const _formFromJsonSchema = (key:any, jsonSchema: any) : JSX.Element => {
    if (jsonSchema.type === "object") {
        const properties:any = Object.entries(jsonSchema.properties).map(([key, value]) => {
            return _formFromJsonSchema(key, value);
        });
        return properties;
    } else if (jsonSchema.type === "string") {
        return <FormInputText key={key} label={jsonSchema.title || key} name={key} />;
    } else if (jsonSchema.type === "integer") {
        return <FormInputText key={key} label={jsonSchema.title || key} name={key} />;
    } else if (jsonSchema.type === "number") {
        return <FormInputText key={key} label={jsonSchema.title || key} name={key} />;
    } else if (jsonSchema.type === "boolean") {
        return <FormInputText key={key} label={jsonSchema.title || key} name={key} />;
    } else {
        throw new Error(`Unsupported type: ${jsonSchema.type}`);
    }
}
