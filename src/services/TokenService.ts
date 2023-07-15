import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";
import {ErrorWithAction} from "./models/IError";
import {IAccessTokenData} from "./models/DTO/ITokenModels";
import {Result} from "./result/Result";
import {ILoginDTO} from "./models/DTO/ILoginDTO";
import {UserRoles} from "./models/UserRoles";
import HttpRequest from "./http/HttpRequest";

/**
 * Сервис для работы с токеном
 */
export class TokenService {

    /**
     * Метод для парсинга токена
     * @param tokenString Строка с токеном
     * @returns Возвращает объект типа ITokenData или null
     */
    static parseAccessToken(tokenString: string): IAccessTokenData | null {
        const token = jwtDecode(tokenString) as object

        if(!("id" in token) || !("login" in token) || !("userRole" in token) || !("exp" in token)) {
            return null
        }

        const id = token.id as string
        const login = token.login as string
        const userRole = token.userRole as string
        const exp = token.exp as number

        if(id === null || login === null || userRole === null || exp === null) {
            return null
        }

        const parsedRole = userRole as UserRoles;

        return {
            id: Number(id),
            login: String(login),
            userRole: parsedRole,
            exp: Number(exp)
        }
    }

    /**
     * Метод для обновления access и refresh токена
     * @returns ILoginResponse или IError
     */
    static async updateAuthAsync(): Promise<Result<ILoginDTO>> {

        const refreshToken = this.getRefreshToken()

        if (!refreshToken) {
            const error = new ErrorWithAction("redirect", "Авторизуйтесь", "Critical", "/login")
            return Result.withError(error)
        }

        const result = await new HttpRequest<ILoginDTO>()
            .withUrl("/authorization/update-auth")
            .withPostMethod()
            .withBody({refreshToken: refreshToken})
            .sendAsync()

        if (result.hasError()) {
            return Result.withError(result.getError())
        }

        return Result.ok(result.unwrap())
    }

    /**
     * Метод для получения access токена
     * @returns строку при наличии токена
     */
    static async getAccessTokenAsync(): Promise<Result<string>> {
        const token = Cookies.get("AccessToken")

        if(token === undefined) {

            const updateAuthResult = await this.updateAuthAsync()

            if (updateAuthResult.hasError()) {
                const error = updateAuthResult.getError()
                return Result.withError(error)
            }

            const updatedTokens = updateAuthResult.unwrap()

            this.setRefreshToken(updatedTokens.refreshToken)
            this.setAccessToken(updatedTokens.accessToken)

            return Result.ok(updatedTokens.accessToken)
        }

        const decodedAccessToken = this.parseAccessToken(token)

        if (decodedAccessToken === null) {
            return Result.withErrorMessage("Ошибка парсинга токена")
        }

        const currentTime = Date.now() / 1000;

        if (currentTime - decodedAccessToken.exp > 0) {
            const updateAuthResult = await this.updateAuthAsync()

            if (updateAuthResult.hasError()) {
                const error = updateAuthResult.getError()
                return Result.withError(error)
            }

            const updatedTokens = updateAuthResult.unwrap()

            this.setRefreshToken(updatedTokens.refreshToken)
            this.setAccessToken(updatedTokens.accessToken)

            return Result.ok(updatedTokens.accessToken)
        }

        return Result.ok(token)
    }

    /**
     * Метод для получения refresh токена
     * @returns возвращает refresh токен
     */
    static getRefreshToken(): string | null {

        const token = Cookies.get("RefreshToken")

        if (token === undefined) {
            return null
        }

        return token
    }

    /**
     * Метод для установки refresh токена в cookie
      * @param token refresh токен
     */
    static setRefreshToken(token: string): void {
        Cookies.set("RefreshToken", token)
    }

    /**
     * Метод для установки токена в cookie
     * @param token автора
     * @returns null при успешном выполнении и IError при ошибке
     */
    static setAccessToken (token: string): void {
        Cookies.set("AccessToken", token)
    }
}