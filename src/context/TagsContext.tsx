import {createContext, Dispatch, ReactNode, SetStateAction, useState} from "react";

interface ITagContext {
    selectedTags: number[]
    setSelectedTags: Dispatch<SetStateAction<number[]>>,
    checkTagIsSelected: (tagId: number) => boolean
}

export const TagsContext = createContext<ITagContext>({} as ITagContext)

interface ITagContextProviderProps {
    children: ReactNode
}

export const TagContextProvider = ({children}: ITagContextProviderProps) => {

    const [selectedTags, setSelectedTags] = useState<number[]>([])

    function checkTagIsSelected(tagId: number): boolean {
        return selectedTags.find(element => element === tagId) !== undefined;
    }

    return (
        <TagsContext.Provider value={{selectedTags: selectedTags, setSelectedTags: setSelectedTags, checkTagIsSelected: checkTagIsSelected}}>
            {children}
        </TagsContext.Provider>
    )
}