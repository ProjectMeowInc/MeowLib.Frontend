import {createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState} from "react";
import IUserSettings, {Themes} from "../services/settings/UserSettings";
import SettingsService from "../services/SettingsService";

export const SettingsContext = createContext<ISettingsContext>({} as  ISettingsContext)

interface ISettingsContextProviderProps {
    children: ReactNode
}

interface ISettingsContext {
    settings: IUserSettings
    fontSize: number
    setFontSize: Dispatch<SetStateAction<number>>
    lineHeight: number
    setLineHeight: Dispatch<SetStateAction<number>>
    theme: Themes
    setThemes: Dispatch<SetStateAction<Themes>>
}

export function SettingsContextProvider({children}: ISettingsContextProviderProps) {

    const settings = SettingsService.getSettings()

    const [fontSize, setFontSize] = useState<number>(settings.reader.fontSize)
    const [lineHeight, setLineHeight] = useState<number>(settings.reader.lineHeight)
    const [theme, setTheme] = useState<Themes>(settings.theme)

    useEffect(() => {
        SettingsService.updateUserSettings({
            ...settings,
            theme: theme,
            reader: {
                fontSize: fontSize,
                lineHeight: lineHeight
            }
        })
    }, [fontSize, lineHeight])

    return (
        <SettingsContext.Provider value={{settings: settings, fontSize: fontSize, setFontSize: setFontSize, lineHeight: lineHeight, setLineHeight: setLineHeight, theme: theme, setThemes: setTheme}}>
            {children}
        </SettingsContext.Provider>
    )
}