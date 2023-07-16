import { createContext, useState } from "react";
import { UserContextType } from "../functions/DataType";

// const UserContext = createContext<string>("");

// interface UserContextType {
//   user: string;
//   setUser: React.Dispatch<React.SetStateAction<string>>;
// }

const UserContext = createContext<UserContextType>({
  user: "",
  setUser: () => {return},
});

export const UserProvider = ({ children }: any) => {
    const [user, setUser] = useState("");

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext;