import {useContext} from "react";
import {AuthorContext} from "../context/AuthorContext";

export const useAuthor = () => {
    return useContext(AuthorContext)
}