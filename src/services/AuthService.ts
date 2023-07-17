import {ILogInRequest, ISignInRequest} from "./models/requests/UserRequests";
import {ILoginResponse} from "./models/responses/AuthResponses";
import {EmptyResult, Result} from "./result/Result";
import HttpRequest from "./http/HttpRequest";
import {ILoginDTO} from "./models/DTO/ILoginDTO";

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

        const result = await new HttpRequest<void>()
            .withUrl("/authorization/sign-in")
            .withBody(requestData)
            .withPostMethod()
            .sendAsync()

        if (result.hasError()) {
            return EmptyResult.withError(result.getError())
        }

        return EmptyResult.ok()
    }

    /**
     * Метод для авторизации пользователя
     * @param requestData Данные для авторизации.
     * @returns Возвращает ошибку или два токена
     */
    static async authorizationAsync(requestData: ILogInRequest): Promise<Result<ILoginDTO>> {

        const result = await new HttpRequest<ILoginResponse>()
            .withUrl("/authorization/log-in")
            .withBody(requestData)
            .withPostMethod()
            .sendAsync()

        if (result.hasError()) {
            return Result.withError(result.getError())
        }

        return Result.ok(result.unwrap())
    }
}