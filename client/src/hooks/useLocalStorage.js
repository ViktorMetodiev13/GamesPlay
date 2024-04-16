import { useState } from "react";

export const useLocalStorage = (key, initialValues) => {
    const [state, setState] = useState(() => {
        const persistedStateSerilized = localStorage.getItem(key);
        if (persistedStateSerilized) {
            const persistedState = JSON.parse(persistedStateSerilized);

            return persistedState;
        }

        return initialValues;
    });

    const setLocalStorageState = (value) => {
        setState(value);

        localStorage.setItem(key, JSON.stringify(value));
    };

    return [
        state,
        setLocalStorageState,
    ];
};