import {ILogInRequest, ISignInRequest} from "./models/requests/IUserRequests";
import axios from "axios";
import {ErrorService} from "./ErrorService";
import {ILoginResponse} from "./models/responses/IAuthResponses";
import {EmptyResult, Result} from "./result/Result";

/**
 * Сервис для авторизации пользователей
 */
export class AuthService {

    /**
     * Метод для регистрации пользователя
     * @param requestData данные для регистрации
     * @returns ошибка при наличии или null
     */
    static async registrationAsync(requestData: ISignInRequest): Promise<EmptyResult> {
        try {
            await axios.post(process.env.REACT_APP_URL_API + "/authorization/sign-in", requestData)

            return EmptyResult.ok()
        }
        catch (err: any) {
            return EmptyResult.withError(ErrorService.toServiceError(err, "AuthService"))
        }
    }

    /**
     * Метод для авторизации пользователя
     * @param requestData Данные для авторизации.
     * @returns Возвращает ошибку или два токена
     */
    static async authorizationAsync(requestData: ILogInRequest): Promise<Result<ILoginResponse>> {
        try {
            const response = await axios.post<ILoginResponse>(process.env.REACT_APP_URL_API + "/authorization/log-in", requestData)

            return Result.ok(response.data)
        }
        catch (err: any) {
            return Result.withError(ErrorService.toServiceError(err, "UserService"))
        }
    }
}