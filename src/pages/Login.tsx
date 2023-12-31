import { useEffect } from "react";
import LoginForm from "../components/unique/LoginForm";
import { useNavigate } from "react-router-dom";

export default function Login () {
    const navigate = useNavigate();
    useEffect (() => {
        if (localStorage.getItem("session") != null) {
            navigate("/");
        }
    }, []);
    
    return (
        <LoginForm/>
    );
}