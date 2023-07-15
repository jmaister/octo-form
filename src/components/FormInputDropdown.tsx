import { useContext } from "react";

import { OctoFormContext } from "../OctoForm";
import { isRequired, sizeToClassNameDropdown } from "../utils";
import { FormInputPropsWithOptions } from "./FormInputProps";
import FieldError from "../utils/FieldError";


export const FormInputDropdown= ({name, label, enabled, size, options}: FormInputPropsWithOptions) => {
  const {control, schema, formEnabled, ...ctx } = useContext(OctoFormContext);

  enabled = enabled ?? formEnabled ?? true;
  size = size ?? ctx.size;

  const required = isRequired(schema, name);

  const pointer = {cursor: "pointer"};

  return (<>
    <label>{label} {required ? "*" : null}</label>
    <select className={"form-select " + sizeToClassNameDropdown(size) + " mb-3"}
        disabled={!enabled}
        style={pointer}
        {...ctx.register(name)}
        >
        {required
            ? <option value="" disabled hidden></option>
            : <option value=""></option>
        }
        {options.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
        ))}
    </select>
    <FieldError error={ctx.formState.errors[name]?.message?.toString()} />
    </>
  )

};
