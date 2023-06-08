import {UserRolesEnum} from "./IUserModels";

/**
 * Интерфейс описывающий информацию хранящуюся в access токене.
 */
export interface IAccessTokenData {
    id: number
    login: string
    userRole: UserRolesEnum
    exp: number
}