import {createContext, Dispatch, ReactNode, SetStateAction, useState} from "react";

interface IAuthorContextProviderProps {
    children: ReactNode
}

interface IAuthorContext {
    selectedAuthor: number | null
    setSelectedAuthor: Dispatch<SetStateAction<number | null>>
}

export const AuthorContext = createContext<IAuthorContext>({} as IAuthorContext)

export const AuthorContextProvider = ({children}: IAuthorContextProviderProps) => {

    const [selectedAuthor, setSelectedAuthor] = useState<number | null>(null)

    return (
        <AuthorContext.Provider value={{selectedAuthor: selectedAuthor, setSelectedAuthor: setSelectedAuthor}}>
            {children}
        </AuthorContext.Provider>
    )
}