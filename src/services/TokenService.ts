import {ITokenData, UserRolesEnum} from "./models/DTO/IUserModels";
import jwtDecode from "jwt-decode";

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

        if(!("id" in token) || !("login" in token) || !("role" in token)) {
            return null
        }

        const id = token.id as string
        const login = token.login as string
        const role = token.role as string

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
}