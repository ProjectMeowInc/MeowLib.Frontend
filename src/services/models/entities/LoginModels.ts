/**
 * Интерфейс описывающий ответ на успешный запрос об авторизации.
 */
export interface ILoginDTO {
    accessToken: string
    refreshToken: string
}