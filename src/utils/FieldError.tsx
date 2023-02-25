import React from "react";

export interface FieldErrorProps {
    error?: string;
}

export default function FieldError({ error } : FieldErrorProps) {
    return <div className="invalid-feedback">{error}</div>;
}
