import { useEffect, useMemo, useState } from "react";

import { OctoForm, OnSubmitFnType } from "../OctoForm";
import * as yup from "yup";
import { FieldValues } from "react-hook-form";
import { FormInputText } from "./FormInputText";
import { SubmitButton } from "../extra/SubmitButton";
import { ErrorList } from "../extra/ErrorList";
import { FormInputDropdown } from "./FormInputDropdown";
import { FormInputCheckbox } from "./FormInputCheckbox";
import { FormInputDate } from "./FormInputDate";
import { FormInputDateTime } from "./FormInputDateTime";

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
    const [currentMessages, setCurrentMessages] = useState<Array<string>>([]);

    const yupSchema = useMemo(() => fromJsonSchema(jsonSchema), [jsonSchema]);
    const view = useMemo(() => formFromJsonSchema(jsonSchema), [jsonSchema]);

    const addMessage = (msg:string) => {
        setCurrentMessages(current => {
            console.log("error", msg)
            return [...current, msg];
        })
    };

    useEffect(() => {
        if (load) {
            // TODO: parse the response with the schema to remove extra fields
            if (isActionUrl(load)) {
                fetch(load.url, {
                    method: load.method,
                }).then(response => response.json()).then(data => {
                    setValues(data);
                    setLoading(false);
                }).catch(err => {
                    addMessage(err.toString());
                    setLoading(false);
                });
            } else {
                load().then(data => {
                    setValues(data);
                    setLoading(false);
                }).catch(err => {
                    addMessage(err.toString());
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
        {currentMessages.length>0 ?
            <div>
                {currentMessages.map(m => <p key={m} className="error">{m}</p>)}
            </div>
            : null}
        <ErrorList />
        <div style={{textAlign: "right"}}>
            <SubmitButton />
        </div>
    </OctoForm>
}

const fromJsonSchema = (jsonSchema: any) : yup.ObjectSchema<any> => {
    if (jsonSchema.type === "object") {
        const properties:any = {};
        Object.entries(jsonSchema.properties).forEach(([key, value]) => {
            properties[key] = _fromJsonSchema(key, value, jsonSchema);
        });
        return yup.object(properties);
    } else {
        throw new Error(`Unsupported type: ${jsonSchema.type}`);
    }
}

const _fromJsonSchema = (key:string, jsonSchema: any, parent:any) : any => {
    if (jsonSchema.type === "object") {
        const properties:any = {};
        Object.entries(jsonSchema.properties).forEach(([key, value]) => {
            properties[key] = _fromJsonSchema(key, value, jsonSchema);
        });
        return yup.object().shape(properties);
    } else {
        let y:any = yup;

        // Type
        if (jsonSchema.type === "string") {
            y = y.string();
        } else if (jsonSchema.type === "integer") {
            y =  y.number().integer()
        } else if (jsonSchema.type === "number") {
            y = y.number();
        } else if (jsonSchema.type === "boolean") {
            y = y.boolean();
        } else {
            throw new Error(`Unsupported type: ${jsonSchema.type}`);
        }

        // Required?
        if (parent.required && parent.required.includes(key)) {
            console.log("Req", key);
            y = y.required();
        }

        // Title
        y = y.label(_getTitle(jsonSchema, key));

        // Options
        if (jsonSchema.enum) {
            y = y.oneOf(jsonSchema.enum);
        }

        return y;

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

    const title = _getTitle(jsonSchema, key);

    if (jsonSchema.type === "object") {
        const properties:any = Object.entries(jsonSchema.properties).map(([key, value]) => {
            return _formFromJsonSchema(key, value);
        });
        return properties;
    } else if (jsonSchema.type === "string") {
        if (jsonSchema.enum) {
            const opts = jsonSchema.enum.map((element:any) => ({
                label: element,
                value: element,
            }))
            return <FormInputDropdown key={key} label={title} name={key} options={opts} />
        } else if (jsonSchema.format === "date") {
            return <FormInputDate key={key} label={title} name={key} />;
        } else if (jsonSchema.format === "date-time") {
            return <FormInputDateTime key={key} label={title} name={key} />;
        }
        return <FormInputText key={key} label={title} name={key} />;
    } else if (jsonSchema.type === "integer") {
        return <FormInputText key={key} label={title} name={key} />;
    } else if (jsonSchema.type === "number") {
        return <FormInputText key={key} label={title} name={key} />;
    } else if (jsonSchema.type === "boolean") {
        return <FormInputCheckbox key={key} label={title} name={key} />;
    } else {
        throw new Error(`Unsupported type: ${jsonSchema.type}`);
    }
}

const _getTitle = (jsonSchema:any, key:string) : string => {
    if (jsonSchema.title) {
        return jsonSchema.title;
    } else {
        let s = key.replace(/([A-Z])/, " $1");
        s = s.substring(0,1).toUpperCase() + s.substring(1);
        console.log("title", s);
        return s;
    }
}