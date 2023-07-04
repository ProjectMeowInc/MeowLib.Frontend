import {createContext, Dispatch, SetStateAction, useState} from "react";
import {AlertService} from "../services/AlertService";

interface ITagContext {
    updateTags: number[]
    setUpdateTags: Dispatch<SetStateAction<number[]>>,
    checkTagIsSelected: (tagId: number) => boolean
}

interface ITagContextProps {
    children: string | JSX.Element | JSX.Element[]
}

export const TagsContext = createContext<ITagContext>({
    updateTags: [],
    setUpdateTags: () => {
        AlertService.errorMessage("Неожиданное поведение")
    },
    checkTagIsSelected: () => {
        AlertService.errorMessage("Неожиданное поведение")
        return false
    }
})

export const TagContextProvider = ({children}: ITagContextProps) => {

    const [updateTags, setUpdateTags] = useState<number[]>([])

    function checkTagIsSelected(tagId: number): boolean {
        return updateTags.find(element => element === tagId) !== undefined;
    }

    return (
        <TagsContext.Provider value={{updateTags: updateTags, setUpdateTags: setUpdateTags, checkTagIsSelected: checkTagIsSelected}}>
            {children}
        </TagsContext.Provider>
    )
}