
import { useContext, useEffect, useState } from "react"
import { OctoFormContext } from '../OctoForm';

export interface SubmitButtonProps {
    label?: string
    icon?: JSX.Element
}

export const SubmitButton = ({label, icon}: SubmitButtonProps) => {
    const context = useContext(OctoFormContext);

    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    useEffect(() => {
        setIsButtonDisabled(!context.formEnabled || context.formState.isSubmitting || !context.formState.isValid || !context.formState.isDirty);
    }, [context.formEnabled, context.formState.isSubmitting, context.formState.isValid, context.formState.isDirty]);

    label = label ?? "Save";

    return <button
        className="btn btn-primary"
        type="submit"
        color="primary"
        disabled={isButtonDisabled}>
        {icon} {label}
    </button>
}
