/**
 * Интерфейс описывающий ответ на успешный запрос об авторизации.
 */
export interface ILogin {
    accessToken: string
    refreshToken: string
}