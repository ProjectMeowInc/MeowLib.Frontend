import {ITokenData, UserRolesEnum} from "./models/DTO/IUserModels";
import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";
import {ErrorService} from "./ErrorService";
import {IError} from "./models/IError";

/**
 * Сервис для работы с токеном
 */
export class TokenService {

    /**
     * Метод для парсинга токена
     * @param tokenString Строка с токеном
     * @returns Возвращает объект типа ITokenData или null
     */
    static parseToken (tokenString: string): ITokenData | null {
        const token = jwtDecode(tokenString) as object

        if(!("id" in token) || !("login" in token) || !("userRole" in token)) {
            return null
        }

        const id = token.id as string
        const login = token.login as string
        const role = token.userRole as string

        if(id === null || login === null || role === null) {
            return null
        }

        const parsedRole = role as keyof typeof UserRolesEnum;

        return {
            id: Number(id),
            login: String(login),
            role: UserRolesEnum[parsedRole]
        }
    }

    /**
     * Метод для получения токена из cookie
     * @returns строку при наличии токена
     */
    static getAccessToken (): string | null {
        const token = Cookies.get("token")

        if(token === undefined) {
            return null
        }

        return token
    }

    /**
     * Метод для установки токена в cookie
     * @param token автора
     * @returns null при успешном выполнении и IError при ошибке
     */
    static setAccessToken (token: string): null | IError {
        if(token.length === 0) {
            return ErrorService.criticalError("Cookie не найден")
        }

        Cookies.set("token", token)

        return null
    }
}