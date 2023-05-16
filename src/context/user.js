'use client';
import { createContext, useContext, useState } from "react";

const UserContext = createContext({});

export const UserContextProvider = ({children}) => {

    const [idInstanceContext, setIdInstanceContext] = useState(''); // стейт idInstance, записываем и шерим компонентам
    const [tokenContext, setTokenContext] = useState('');   // стейт token, записываем и шерим компонентам
    const [telContext, setTelContext] = useState('');   // стейт phone number, записываем и шерим компонентам
// для каждого стейта можно создать свой провайдер
    return (
        <UserContext.Provider value={{idInstanceContext, setIdInstanceContext, tokenContext, setTokenContext, telContext, setTelContext}}>
            {children}
        </UserContext.Provider>
    )
}

export const useUserContext = () => useContext(UserContext);