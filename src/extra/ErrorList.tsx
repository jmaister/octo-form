import { useContext } from "react";
import { OctoFormContext } from "../OctoForm";


export const ErrorList = () => {
    const context = useContext(OctoFormContext);

    const errors = context.formState.errors;
    return <ul>
        {Object.keys(errors).map((key) => {
            const i = errors[key];
            const msg = i?.message || '';
            return <li key={key}>
                <label color="error">{JSON.stringify(msg)}</label>
            </li>
        })}
    </ul>
}
