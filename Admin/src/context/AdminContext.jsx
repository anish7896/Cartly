import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

export const AdminContext = createContext();

function AdminProvider({ children }) {
    const [admin, setAdmin] = useState(null);

    const { serverUrl } = useContext(AuthContext);

    const getAdmin = async () => {
        try {
            const result = await axios.get(
                serverUrl + '/api/user/getadmin',
                { withCredentials: true }
            );

            setAdmin(result.data);
            console.log("Admin data fetched successfully:", result.data);

        } catch (error) {
            console.error("Error fetching admin data:", error);
        }
    };

    useEffect(() => {
        getAdmin();
    }, []);

    return (
        <AdminContext.Provider value={{ admin, setAdmin , getAdmin }}>
            {children}
        </AdminContext.Provider>
    );
}

export default AdminProvider;