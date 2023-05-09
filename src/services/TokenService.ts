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

    static getAccessToken (): string | IError {
        const token = Cookies.get("token")

        if(token === undefined) {
            return ErrorService.commonError("Ошибка токена")
        }

        return token
    }

    static setAccessToken (token: string): null | IError {
        if(token.length === 0) {
            return ErrorService.criticalError("Cookie не найден")
        }

        Cookies.set("token", token)

        return null
    }
}