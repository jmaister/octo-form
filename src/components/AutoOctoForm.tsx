import { useEffect, useMemo, useState } from "react";

import { OctoForm, OnSubmitFnType } from "../OctoForm";
import * as yup from "yup";
import { FieldValues } from "react-hook-form";
import { FormInputText } from "./FormInputText";
import { SubmitButton } from "../extra/SubmitButton";

type ActionUrl = {
    url: string;
    method: "GET" | "POST" | "PUT";
};

const isActionUrl = (obj: any) : obj is ActionUrl => {
    return obj.url && obj.method;
}

type LoadFunction = () => Promise<any>;
type SaveFunction<T> = (data:T) => Promise<any>;

export type AutoOctoFormProps<T extends FieldValues> = {
    jsonSchema: any;
    defaultValues?: T;
    onSubmit?: OnSubmitFnType<T>;
    // TODO: better naming for load and save
    load?: ActionUrl | LoadFunction;
    save?: ActionUrl | SaveFunction<T>;
};

export default function AutoOctoForm<T extends FieldValues>({ jsonSchema, defaultValues, onSubmit, load, save }: AutoOctoFormProps<T>) {
    const [values, setValues] = useState<T>({} as T);
    const [loading, setLoading] = useState<boolean>(true);

    const yupSchema = useMemo(() => fromJsonSchema(jsonSchema), [jsonSchema]);
    const view = useMemo(() => formFromJsonSchema(jsonSchema), [jsonSchema]);

    useEffect(() => {
        if (load) {
            // TODO: parse the response with the schema to remove extra fields
            if (isActionUrl(load)) {
                fetch(load.url, {
                    method: load.method,
                }).then(response => response.json()).then(data => {
                    setValues(data);
                    setLoading(false);
                });
            } else {
                load().then(data => {
                    setValues(data);
                    setLoading(false);
                });
            }
        } else {
            setValues(defaultValues || {} as T);
            setLoading(false);
        }
    }, [load]);

    let submitFunction : OnSubmitFnType<T> = () => {};
    if (onSubmit) {
        if (save) {
            throw new Error("Cannot have both onSubmit and save");
        }
        submitFunction = onSubmit;
    } else {
        if (isActionUrl(save)) {
            submitFunction = async (data:T) => {
                console.log("submitting", data);
                const response = await fetch(save.url, {
                    method: save.method,
                    body: JSON.stringify(data),
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                const responseData = await response.json();
                return responseData;
            }
        } else if (save) {
            submitFunction = save;
        } else {
            throw new Error("Must have either 'onSubmit' or 'save' parameters.");
        }
    }

    if (loading) {
        return <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>

    }

    return <OctoForm schema={yupSchema} defaultValues={values} onSubmit={submitFunction}>
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
