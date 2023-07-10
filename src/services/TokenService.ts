import {UserRolesEnum} from "./models/DTO/IUserModels";
import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";
import {ErrorService} from "./ErrorService";
import {ErrorTypesEnum, ErrorWithAction, IError, IErrorWithAction} from "./models/IError";
import {IAccessTokenData} from "./models/DTO/ITokenModels";
import axios from "axios";
import {ILoginResponse} from "./models/responses/IAuthResponses";
import {AlertService} from "./AlertService";
import {RedirectService} from "./RedirectService";

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

        const parsedRole = userRole as keyof typeof UserRolesEnum;

        return {
            id: Number(id),
            login: String(login),
            userRole: UserRolesEnum[parsedRole],
            exp: Number(exp)
        }
    }

    /**
     * Метод для обновления access и refresh токена
     * @returns ILoginResponse или IError
     */
    static async updateAuthAsync(): Promise<ILoginResponse | IError> {
        try {

            const refreshToken = this.getRefreshToken()

            if (refreshToken === null && RedirectService.getPath() !== "/") {
                return new ErrorWithAction("redirect", "Авторизуйтесь", ErrorTypesEnum.Critical, "/login")
            }

            const response = await axios.post<ILoginResponse>(process.env.REACT_APP_URL_API + "/authorization/update-auth", {
                refreshToken: refreshToken
            })

            return response.data
        }
        catch (err: any) {

            if (err.isAxiosError) {
                if (err.response.status === 401) {
                    const error: IErrorWithAction = new ErrorWithAction("redirect", "Пожалуйста авторизуйтесь снова", ErrorTypesEnum.Critical, )

                    return error
                }
            }

            return ErrorService.toServiceError(err, "TokenService")
        }
    }

    /**
     * Метод для получения access токена
     * @returns строку при наличии токена
     */
    static async getAccessTokenAsync(): Promise<string | null> {
        const token = Cookies.get("AccessToken")

        if(token === undefined) {

            const updateResult = await this.updateAuthAsync()

            if (ErrorService.isError(updateResult)) {
                if (ErrorService.isActionError(updateResult)) {
                    updateResult.execute()
                    return null
                }

                if (updateResult.errorType === ErrorTypesEnum.Critical) {
                    AlertService.errorMessage("Это пизда " + updateResult.displayMessage)
                    return null
                }

                AlertService.warningMessage(updateResult.displayMessage)
                return null
            }

            this.setRefreshToken(updateResult.refreshToken)
            this.setAccessToken(updateResult.accessToken)

            return updateResult.accessToken
        }

        const decodedAccessToken = this.parseAccessToken(token)

        if (decodedAccessToken === null) {
            return null
        }

        const currentTime = Date.now() / 1000;

        if (currentTime - decodedAccessToken.exp > 0) {
            const updateResult = await this.updateAuthAsync()

            if (ErrorService.isError(updateResult)) {
                if (ErrorService.isActionError(updateResult)) {
                    updateResult.execute()
                    return null
                }

                if (updateResult.errorType === ErrorTypesEnum.Critical) {
                    AlertService.errorMessage("Это пизда " + updateResult.displayMessage)
                    return null
                }

                AlertService.warningMessage(updateResult.displayMessage)
                return null
            }

            this.setRefreshToken(updateResult.refreshToken)
            this.setAccessToken(updateResult.accessToken)

            return updateResult.accessToken
        }

        return token
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