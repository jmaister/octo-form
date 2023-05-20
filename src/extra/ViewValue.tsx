import { useContext } from "react";
import { OctoFormContext } from "../OctoForm";

/**
 * Used to debug. It shows the current values of the form.
 */
export const ViewValue = () => {
    const context = useContext(OctoFormContext);

    const values = context.watch();
    return <div>{JSON.stringify(values)}</div>
}
