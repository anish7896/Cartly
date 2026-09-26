import { createContext } from "react";

export const AuthContext = createContext();

function AuthProvider({ children }) {
    const serverUrl = "https://cartly-backend-yc2m.onrender.com";

    return (
        <AuthContext.Provider value={{ serverUrl }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
