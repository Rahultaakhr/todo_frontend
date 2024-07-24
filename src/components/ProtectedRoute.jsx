import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }) {
    const authUser = useSelector(state => state.user.authUser)
    const navigate = useNavigate()
    useEffect(() => {
        if (!authUser) {
            navigate("/login")
        }
        else {
            navigate("/")
        }
    }, [])
    return authUser ? children : null
}

export default ProtectedRoute