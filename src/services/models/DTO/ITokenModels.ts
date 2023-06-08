import {UserRolesEnum} from "./IUserModels";

/**
 * Интерфейс описывающий информацию хранащуюся в токене.
 */
export interface ITokenData {
    id: number
    login: string
    userRole: UserRolesEnum
    exp: number
}