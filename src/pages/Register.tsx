import { useNavigate } from "react-router-dom";
import RegisterForm from "../components/unique/RegisterForm";
import { useEffect } from "react";

export default function Register () {
    const navigate = useNavigate();
    useEffect (() => {
        if (localStorage.getItem("name") != null) {
            navigate("/");
        }
    }, []);
    
    return (
        <RegisterForm/>
    );
}