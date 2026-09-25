import { createContext } from "react";

export const AuthContext = createContext();

function AuthProvider({ children }) {
    const serverUrl = "http://localhost:8000";

    return (
        <AuthContext.Provider value={{ serverUrl }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;