import { useContext } from "react";
import { OctoFormContext } from "../OctoForm";


type WatchProps = {
    name: string[];
    fn: (values: any[]) => JSX.Element;
}

export const Watch = ({name, fn}:WatchProps) => {
    const context = useContext(OctoFormContext);

    const currentValue = context.watch(name);

    return fn(currentValue);
}
