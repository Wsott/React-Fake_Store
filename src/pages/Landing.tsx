import { useContext, useEffect } from "react";
import UserContext from "../context/UserProvider";
import { useMutation } from "react-query";
import { LoginToken } from "../functions/DataType";
import axios from "axios";

export default function Landing () {
    const { user, setUser } = useContext(UserContext);
    
    const nameMutation = useMutation(
        (data: LoginToken) => {
            return axios.get("https://api.escuelajs.co/api/v1/auth/profile", {headers: {
                "Authorization": "Bearer " + data.access_token
            }});
        },
        {
            onSuccess: (data) => {
                const name = data.data.name as string;
                //localStorage.setItem("name", data.data.name);
                setUser(name)
                console.log(name);
                // navigate("/");
            }
        }
    )

    useEffect (() => {
        const tokens = JSON.parse(localStorage.getItem("session") || "{}");
        nameMutation.mutate(tokens);
    }, []);

    return (
        <>
        <h1>LANDING</h1>
        </>
    );
}