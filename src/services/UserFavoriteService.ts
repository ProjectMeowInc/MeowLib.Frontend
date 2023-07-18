import {EmptyResult, Result} from "./result/Result";
import {ICreateUserFavoriteRequest} from "./models/requests/UserFavoriteRequests";
import HttpRequest from "./http/HttpRequest";
import {IGetUserFavoriteResponse} from "./models/responses/UserFavoriteResponses";
import {IUserFavorite} from "./models/entities/UserFavoriteModels";
import {UserBookStatus} from "./models/UserBookStatus";

/**
 * Метод добавляет книги в список пользователя.
 */
export class UserFavoriteService {
    static async addToUserFavorite(data: ICreateUserFavoriteRequest): Promise<EmptyResult> {
        const result = await HttpRequest.create<void>()
            .withUrl("/users/favorite")
            .withBody(data)
            .withPostMethod()
            .withAuthorization()
            .sendAsync()

        if (result.hasError()) {
            return EmptyResult.withError(result.getError())
        }

        return EmptyResult.ok();
    }
    
    static async getUserFavorite(): Promise<Result<IUserFavorite[]>> {

        const result = await HttpRequest.create<IGetUserFavoriteResponse>()
            .withUrl("/users/favorite")
            .withGetMethod()
            .withAuthorization()
            .sendAsync()

        if (result.hasError()) {
            return Result.withError(result.getError())
        }

        return Result.ok(result.unwrap().items);
    }

    static getDisplayStatusName(status: UserBookStatus): string {
        switch (status) {
            case "Favourite":
                return "Любимое"
            case "InPlans":
                return "В планах"
            case "Read":
                return "Прочитано"
            case "ReadingNow":
                return "Читаю"
            default:
                return "N/A"
        }
    }
}