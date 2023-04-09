import { useContext } from "react";

import { OctoFormContext } from "../OctoForm";
import { isRequired, sizeToClassNameDropdown } from "../utils";
import { FormInputPropsWithOptions } from "./FormInputProps";


export const FormInputDropdown= ({name, label, enabled, options}: FormInputPropsWithOptions) => {
  const {control, schema, formEnabled, size } = useContext(OctoFormContext);

  enabled = enabled ?? formEnabled ?? true;

  const required = isRequired(schema, name);

  // TODO: fix size

  return (<>
    <label>{label} {required ? "*" : null}</label>
    <select className={"form-select " + sizeToClassNameDropdown(size)} disabled={!enabled}>
        {required
            ? <option value="" disabled selected hidden></option>
            : <option value=""></option>
        }
        {options.map((option) => (
            <option value={option.value}>{option.label}</option>
        ))}
    </select>
    </>
  )

};
