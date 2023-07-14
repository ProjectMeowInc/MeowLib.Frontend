import {UserRoles} from "../UserRoles";

/**
 * Интерфейс описывающий информацию, хранящуюся в access токене.
 */
export interface IAccessTokenData {
    id: number
    login: string
    userRole: UserRoles
    exp: number
}