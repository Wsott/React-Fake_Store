import { createContext, useState } from "react";
import { LoginToken, UserContextType } from "../functions/DataType";
import { useMutation } from "react-query";
import { URL_PROFILE_FETCH } from "../functions/GlobalConstants";
import axios from "axios";

const UserContext = createContext<UserContextType>({
  user: "",
  role: "",
  setUser: () => {return},
  setRole: () => {return},
  logOut: () => {return},
  logIn: () => {return}
});

export const UserProvider = ({ children }: any) => {
    const [user, setUser] = useState("");
    const [role, setRole] = useState("");

    const logOut = () => {
        //localStorage.removeItem("name");
        localStorage.removeItem("session");
        setUser("");
        setRole("");
    }

    const logIn = (currentUser: string, currentRole: string) => {
        setUser(currentUser);
        setRole(currentRole);
    }

    return (
        <UserContext.Provider value={{ user, role, setUser, setRole, logOut, logIn }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext;