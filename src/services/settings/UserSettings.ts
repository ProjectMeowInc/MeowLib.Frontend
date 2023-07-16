
export type Themes = "white" | "black"

export default interface IUserSettings {
    theme: Themes
    reader: {
        fontSize: number
        lineHeight: number
    }
}