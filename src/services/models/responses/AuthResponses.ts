
/**
 * Интерфейс описывающий ответ на успешный запрос об авторизации.
 */
export interface ILoginResponse {
    accessToken: string
    refreshToken: string
}