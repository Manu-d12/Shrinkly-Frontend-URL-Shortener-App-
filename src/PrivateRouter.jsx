import { useContext } from "react";
import { AppContext } from "./contextApi/ContextApi";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({children, publicPage}) {
    const {token} = useContext(AppContext);
    
    if(publicPage) {
        return token ? <Navigate to="/dashboard"/> : children;
    }

    return !token ? <Navigate to="/login"/> : children;
}