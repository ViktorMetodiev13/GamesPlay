import { useState } from 'react';

export const useForm = (initialValues, onSubmitHandler) => {
    const [values, setValues] = useState(initialValues);

    const changeHandler = (e) => {
        setValues(state => ({...state, [e.target.name]: e.target.value}));
    };

    const onSubmit = (e) => {
        e.preventDefault();

        onSubmitHandler(values);
        
        // ??? doesn't work according to the supervisors code
        // setValues(initialValues);
    };

    const changeValues = (newValues) => {
        setValues(newValues)
    };

    return {
        values,
        changeHandler,
        onSubmit,
        changeValues
    };
};