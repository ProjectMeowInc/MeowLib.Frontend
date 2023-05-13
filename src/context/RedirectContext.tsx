import {createContext} from "react";
import {useNavigate} from "react-router-dom";
import {AlertService} from "../services/AlertService";

interface IRedirectContext {
    delayRedirect: (path: number) => void
}

export const RedirectContext = createContext<IRedirectContext>({
    delayRedirect: path => {
        AlertService.errorMessage("Неожиданное поведение")
    }
})

interface IRedirectContextProps {
    children: string | JSX.Element | JSX.Element[]
}

export const RedirectContextProvider = ({children}: IRedirectContextProps) => {

    const navigate = useNavigate()

    const delayRedirect = (path: number) => {
        setTimeout(() => navigate(path), 2500)
    }

    return (
        <RedirectContext.Provider value={{delayRedirect}}>
            {children}
        </RedirectContext.Provider>
    )
}