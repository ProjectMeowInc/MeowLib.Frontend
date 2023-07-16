import IUserSettings from "./settings/UserSettings";
import Cookies from "js-cookie";

const SETTINGS_COOKIE_NAME: string = "UserSettings"

export default class SettingsService {

    public static getSettings(): IUserSettings {
        const settingsString = Cookies.get(SETTINGS_COOKIE_NAME)

        // Настройки не инициализированные/удалены
        if (!settingsString) {
            const newSettings = this.getNewSettings()
            this.updateUserSettings(newSettings)
            return newSettings
        }

        const parsedSettings = JSON.parse(settingsString) as IUserSettings
        if (!parsedSettings) {
            const newSettings = this.getNewSettings()
            this.updateUserSettings(newSettings)
            return newSettings;
        }

        return parsedSettings
    }

    public static updateUserSettings(settings: IUserSettings): void {
        Cookies.set(SETTINGS_COOKIE_NAME, JSON.stringify(settings))
    }

    private static getNewSettings(): IUserSettings {
        return {
            theme: "white"
        }
    }
}