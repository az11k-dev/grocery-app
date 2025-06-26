import React, { createContext, useContext, useEffect, useState } from "react";
import {supabase} from "../lib/supabaseClient.js";

// Создание контекста
const UserContext = createContext();

// Пользовательский хук
export const useUser = () => useContext(UserContext);

// Провайдер
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            const { data, error } = await supabase.auth.getUser()

            if (error || !data.user) {
                console.error(error);
            } else {
                const { data: profile } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', data.user.id)
                    .single()
                setUser(profile);
            }

            setLoading(false)
        }
        checkAuth()
    }, []);

    return (
        <UserContext.Provider value={{ user, loading }}>
            {children}
        </UserContext.Provider>
    );
};
