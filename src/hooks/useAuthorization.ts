import {useContext} from "react";
import {AuthorizationContext} from "../context/AuthorizationContext";

export const useAuthorization = () => {
    return useContext(AuthorizationContext)
}