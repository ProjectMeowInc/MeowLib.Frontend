/**
 * Интерфейс описывает запрос на регистрацию.
 */
export interface ISignInRequest {
    login: string,
    password: string
}

/**
 *  Интерфес описывает запрос на логин
 */
export interface ILogInRequest {
    login: string
    password: string
    isLongSession: boolean
}

/**
 * Интерфейс описывает запрос на обновление информации о пользователе
 */
export interface IUpdateUserInfoRequest {
    login?: string
    password?: string
    role?: string
}