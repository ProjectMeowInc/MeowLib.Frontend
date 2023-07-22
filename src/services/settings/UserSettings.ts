/**
 * Возможные темы сайта
 */
export type Themes = "white" | "black"

/**
 * Интерфейс описывающий настройки пользователя
 */
export default interface IUserSettings {
    theme: Themes
    reader: {
        fontSize: number
        lineHeight: number
    }
}