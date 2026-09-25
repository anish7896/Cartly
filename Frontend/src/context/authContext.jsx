import { createContext } from "react";

export const AuthContext = createContext();

function AuthProvider({ children }) {
    const serverUrl = "http://localhost:8000";

    const value = {
        serverUrl
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;