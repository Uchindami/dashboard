import React from 'react';
import {logout, reset} from "../features/auth/authSlice";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";


const LogOutButton = ({icon, bgColor, color, bgHoverColor, size, text, borderRadius, width}) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const onLogout = (e) => {
        e.preventDefault()
        dispatch(logout())
        dispatch(reset())
        navigate('/login')
    }

    return (
        <button
            type="button"
            onClick={onLogout}
            style={{backgroundColor: bgColor, color, borderRadius}}
            className={` text-${size} p-3 w-${width} hover:drop-shadow-xl hover:bg-${bgHoverColor}`}>
            {icon} {text}
        </button>
    );
};

export default LogOutButton;