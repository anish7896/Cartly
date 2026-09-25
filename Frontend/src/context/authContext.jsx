import { createContext } from "react";

export const AuthContext = createContext();

function AuthProvider({ children }) {
    const serverUrl = "https://cartly-backend-yc2m.onrender.com";

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
