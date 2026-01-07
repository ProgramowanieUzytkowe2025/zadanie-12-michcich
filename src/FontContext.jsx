import { createContext, useState } from 'react';

export const FontContext = createContext();

export function FontProvider({ children }) {
    const [czcionka, setCzcionka] = useState('small');

    return (
        <FontContext.Provider value={{ czcionka, setCzcionka }}>
            {children}
        </FontContext.Provider>
    );
}