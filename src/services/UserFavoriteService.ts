import {EmptyResult, Result} from "./result/Result";
import {IBookDTO} from "./models/DTO/IBookDTO";
import {UserBookStatus} from "./models/UserBookStatus";
import {ICreateUserFavoriteRequest} from "./models/requests/UserFavoriteRequests";
import HttpRequest from "./http/HttpRequest";
import {IGetUserFavoriteResponse} from "./models/responses/UserFavoriteResponses";
import {IUserBooksStatusDTO} from "./models/DTO/IUserBooksStatusDTO";

interface UserFavoriteDto {
    book: IBookDTO
    status: UserBookStatus
}

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
    
    static async getUserFavorite(): Promise<Result<IUserBooksStatusDTO[]>> {

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
}