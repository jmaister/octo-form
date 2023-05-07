import { useContext } from "react";

import { OctoFormContext } from "../OctoForm";
import { isRequired, sizeToClassNameDropdown } from "../utils";
import { FormInputPropsWithOptions } from "./FormInputProps";
import FieldError from "../utils/FieldError";


export const FormInputDropdown= ({name, label, enabled, options}: FormInputPropsWithOptions) => {
  const {control, schema, formEnabled, size, ...ctx } = useContext(OctoFormContext);

  enabled = enabled ?? formEnabled ?? true;

  const required = isRequired(schema, name);

  // TODO: fix size

  return (<>
    <label>{label} {required ? "*" : null}</label>
    <select className={"form-select " + sizeToClassNameDropdown(size)}
        disabled={!enabled}
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
