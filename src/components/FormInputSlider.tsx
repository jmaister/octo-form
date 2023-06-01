import { useContext, useMemo } from "react";


import { Controller } from "react-hook-form";
import { OctoFormContext } from "../OctoForm";
import { findParamNumber, findTest, isRequired, randomId } from "../utils";
import { FormInputProps } from "./FormInputProps";


export const FormInputSlider = ({ name, label, enabled, size }: FormInputProps) => {
    const { control, schema, watch, formEnabled, ...ctx } = useContext(OctoFormContext);

    enabled = enabled ?? formEnabled ?? true;

    const min = findParamNumber(name, schema, "min", "min");
    const max = findParamNumber(name, schema, "max", "max");
    const step = findTest(name, schema, "integer") ? 1 : 0.01;
    size = size ?? ctx.size;

    const id = useMemo(() => randomId(), []);

    // TODO: size
    const pointer = {cursor: "pointer"};

    return (<>
            <label htmlFor={id} className="form-label">{label}{isRequired(schema, name) ? " * " : null} {watch(name)}</label>
            <input
                type="range"
                className="form-range"
                style={pointer}
                id={id}
                disabled={!enabled}
                min={min}
                max={max}
                step={step}
                {...ctx.register(name)}>

            </input>
        </>
    )

};
