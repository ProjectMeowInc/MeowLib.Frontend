import {EmptyResult, Result} from "./result/Result";
import {ICreateUserFavoriteRequest} from "./models/requests/UserFavoriteRequests";
import HttpRequest from "./http/HttpRequest";
import {IGetUserFavoriteByIdResponse, IGetUserFavoriteResponse} from "./models/responses/UserFavoriteResponses";
import {IUserFavorite, IUserFavorites} from "./models/entities/UserFavoriteModels";
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
    
    static async getUserFavorite(): Promise<Result<IUserFavorites[]>> {

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

    static async getUserFavoriteByBookId(bookId: number): Promise<Result<IUserFavorite | null>> {
        const result = await HttpRequest.create<IGetUserFavoriteByIdResponse>()
            .withUrl(`/users/favorite/book/${bookId}`)
            .withGetMethod()
            .withAuthorization()
            .sendAsync()

        if (!result.hasError()) {
            return Result.ok(result.unwrap())
        }

        const error = result.getError()
        if (!error.isHttpError()) {
            return Result.withError(error)
        }

        if (error.statusCode === 400) {
            return Result.ok(null)
        }

        return Result.withError(error)
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