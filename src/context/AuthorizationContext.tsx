import {createContext, ReactNode, useEffect, useState} from "react";
import SessionUser from "../services/models/SessionUserModel";
import {TokenService} from "../services/TokenService";
import {RedirectService} from "../services/RedirectService";

interface IAuthorizationContext {
    user: SessionUser | null,
    setUser: (user: SessionUser) => void
}

export const AuthorizationContext = createContext<IAuthorizationContext>({} as IAuthorizationContext)

interface IAuthorizationContextProviderProps {
    children: ReactNode
}

export const AuthorizationContextProvider = ({children}: IAuthorizationContextProviderProps) => {
    const [user, setUser] = useState<SessionUser | null>(null)

    useEffect(() => {
        TokenService.getAccessTokenAsync()
            .then(getAccessTokenResult => {
                if (getAccessTokenResult.hasError()) {
                    return
                }

                const accessTokenData = TokenService.parseAccessToken(getAccessTokenResult.unwrap())
                if (!accessTokenData) {
                    return RedirectService.redirectToLogin()
                }

                setUser(new SessionUser(accessTokenData))
            })
    }, [])

    function setUserFunc(user: SessionUser): void {
        setUser(user)
    }

    return (
        <AuthorizationContext.Provider value={{user, setUser: setUserFunc}}>
            {children}
        </AuthorizationContext.Provider>
    )
}