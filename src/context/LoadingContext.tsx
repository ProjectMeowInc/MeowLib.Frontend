import React, {createContext, ReactNode, useState} from "react";
import {AlertService} from "../services/AlertService";

interface ILoadingContext {
    loadingPercent: number
    setLoadingPercent: (percent: number) => void
    startNewTask: () => void
}

export const LoadingContext = createContext<ILoadingContext>({
    loadingPercent: 0,
    setLoadingPercent: () => {
        AlertService.errorMessage("Неожиданное поведение")
    },

    startNewTask: () => {
        AlertService.errorMessage("Неожиданное поведение")
    }
})

interface ILoadingContextProps {
    children: ReactNode
}

export const LoadingContextProvider = ({children}: ILoadingContextProps) => {

    const [loadingPercent, setLoadingPercent] = useState<number>(0)

    function SetLoadingProgress(progress: number): void {
        if(progress > 100 || progress < 0) {
            throw new Error(`Progress не может быть меньше 0 и больше 100. Текущее значение ${progress}`)
        }

        setLoadingPercent(progress)
    }

    function StartNewTask(): void {
        setLoadingPercent(0)
    }

    return (
        <LoadingContext.Provider value={{loadingPercent: loadingPercent, setLoadingPercent: SetLoadingProgress, startNewTask: StartNewTask}}>
            {children}
        </LoadingContext.Provider>
    )
}