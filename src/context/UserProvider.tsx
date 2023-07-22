import { createContext, useState } from "react";
import { UserContextType } from "../functions/DataType";

const UserContext = createContext<UserContextType>({
  user: "",
  setUser: () => {return},
  setRole: () => {return},
  logOut: () => {return}
});

export const UserProvider = ({ children }: any) => {
    const [user, setUser] = useState("");
    const [role, setRole] = useState("");

    const logOut = () => {
        localStorage.removeItem("name");
        localStorage.removeItem("session");
    }

    return (
        <UserContext.Provider value={{ user, setUser, setRole, logOut }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext;