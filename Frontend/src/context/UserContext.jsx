import {
    createContext,
    useState,
    useContext,
    useEffect
} from "react";

import axios from "axios";
import { AuthContext } from "./authContext";

export const UserContext = createContext();

function UserProvider({ children }) {

    const [user, setUser] = useState(null);

    const { serverUrl } = useContext(AuthContext);

    const getCurrentUser = async () => {
        try {
            const response = await axios.get(
                `${serverUrl}/api/user/getuser`,
                {
                    withCredentials: true
                }
            );

            setUser(response.data.user);

            console.log(
                "Current user:",
                response.data.user
            );

        } catch (error) {
            console.error(
                "Error fetching user:",
                error
            );

            setUser(null);
        }
    };

    useEffect(() => {
        getCurrentUser();
    }, [serverUrl]);

    const value = {
        user,
        setUser,
        getCurrentUser
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => {

    const context = useContext(UserContext);

    if (!context) {
        throw new Error(
            "useUser must be used within a UserProvider"
        );
    }

    return context;
};

export default UserProvider;