import { useCallback, useState } from "react";


export function useInput(inputValues) {
    const [values, setValues] = useState(inputValues);

    const handleChange = (event) => {
        setValues(event.target.value);
    }

    const resetInput = useCallback(() => {
        setValues(inputValues);
    }, []);

    return [values, handleChange, resetInput];
}