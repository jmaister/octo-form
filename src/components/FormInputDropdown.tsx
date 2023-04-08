import { useContext } from "react";

import { OctoFormContext } from "../OctoForm";
import { isRequired, sizeToClassNameDropdown } from "../utils";
import { FormInputPropsWithOptions } from "./FormInputProps";


export const FormInputDropdown= ({name, label, enabled, options}: FormInputPropsWithOptions) => {
  const {control, schema, formEnabled, size } = useContext(OctoFormContext);

  enabled = enabled ?? formEnabled ?? true;

  // TODO: fix size

  return (
    <select className={"form-select " + sizeToClassNameDropdown(size)} disabled={!enabled}>
        <option value="" disabled selected hidden>{label} {isRequired(schema, name) ? "*" : null}</option>
        {options.map((option) => (
            <option value={option.value}>{option.label}</option>
        ))}
    </select>
  )

};
