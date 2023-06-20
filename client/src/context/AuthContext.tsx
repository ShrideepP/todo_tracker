import { createContext, useState } from 'react';

interface ContextProps {
    children: React.ReactElement
};

interface ContextValue {
    Id: string
    setId: React.Dispatch<React.SetStateAction<string>>
    credentials: {
        name: string
        email: string
    }
    setCredentials: React.Dispatch<React.SetStateAction<{
        name: string;
        email: string;
    }>>
};

export const AuthContext = createContext<null | ContextValue>(null);

export const AuthProvider = ({ children } : ContextProps) => {

    const [Id, setId] = useState('');
    
    const [credentials, setCredentials] = useState({
        name: '',
        email: '',
    });

    return (
        <AuthContext.Provider value={{
            Id,
            setId,
            credentials,
            setCredentials,
        }}>
            {children}
        </AuthContext.Provider>
    );

};