import {createContext, Dispatch, useState} from "react";
import {AlertService} from "../services/AlertService";

interface ITagContext {
    updateTags: number[]
    setUpdateTags: Dispatch<number[]>
}

interface ITagContextProps {
    children: string | JSX.Element | JSX.Element[]
}

export const TagsContext = createContext<ITagContext>({
    updateTags: [],
    setUpdateTags: () => {
        AlertService.errorMessage("Неожиданное поведение")
    }
})

export const TagContextProvider = ({children}: ITagContextProps) => {

    const [updateTags, setUpdateTags] = useState<number[]>([])

    return (
        <TagsContext.Provider value={{updateTags: updateTags, setUpdateTags: setUpdateTags}}>
            {children}
        </TagsContext.Provider>
    )
}