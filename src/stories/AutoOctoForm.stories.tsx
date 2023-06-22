
import { StoryFn, Meta } from "@storybook/react";

import {
    OnSubmitFnType,
} from "../OctoForm";

import AutoOctoForm from "../components/AutoOctoForm";
import { FromSchema } from "json-schema-to-ts";

export default {
    title: "AutoOctoForm",
    component: AutoOctoForm,
    parameters: {
        formEnabled: {
            values: [true, false],
        },
    }
} as Meta<typeof AutoOctoForm>;

export const FromJsonSchema: StoryFn<typeof AutoOctoForm> = (args) => {
    const jsonSchema = {
        "$schema": "https://json-schema.org/draft/2020-12/schema",
        "$id": "https://example.com/product.schema.json",
        "title": "Product",
        "description": "A product from Acme's catalog",
        "type": "object",
        "properties": {
          "productId": {
            "title": "Product ID",
            "description": "The unique identifier for a product",
            "type": "integer"
          }
        },
        "required": [ "productId" ],
        "additionalProperties": false,
    } as const;

    type ValuesType = FromSchema<typeof jsonSchema>;

    const defaultValues:ValuesType = {
        productId: 55,
    };

    const onSubmit: OnSubmitFnType<ValuesType> = async (data, context) => {
        console.log("data submitted", data);
    };

    return (
        <AutoOctoForm jsonSchema={jsonSchema} defaultValues={defaultValues} onSubmit={onSubmit} />
    );
};


export const FromJsonSchemaWithAutoLoadSave: StoryFn<typeof AutoOctoForm> = (args) => {
    const jsonSchema = {
        "$schema": "https://json-schema.org/draft/2020-12/schema",
        "$id": "https://example.com/product.schema.json",
        "title": "Product",
        "description": "A product from Acme's catalog",
        "type": "object",
        "properties": {
          "origin": {
            "title": "Origin IP",
            "description": "The origin IP address",
            "type": "string",
          }
        },
        "required": [ "productId" ],
        "additionalProperties": false,
    } as const;

    return (
        <AutoOctoForm
            jsonSchema={jsonSchema}
            load={{
                url: "https://httpbin.org/get",
                method: "GET",
            }}
            save={{
                url: "https://httpbin.org/post",
                method: "POST",
            }}
            />
    );
};
