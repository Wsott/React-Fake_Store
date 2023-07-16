import { useContext, useEffect } from "react";
import UserContext from "../context/UserProvider";
import { useMutation } from "react-query";
import { LoginToken } from "../functions/DataType";
import axios from "axios";
import { URL_PROFILE_FETCH } from "../functions/GlobalConstants";

export default function Landing () {
    const { setUser } = useContext(UserContext);
    
    const nameMutation = useMutation(
        (data: LoginToken) => {
            return axios.get(URL_PROFILE_FETCH, {headers: {
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