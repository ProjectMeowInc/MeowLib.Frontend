import {ITagDto} from "./models/entities/TagModels";
import {ICreateTagRequest, IUpdateTagRequest} from "./models/requests/TagRequests";
import {EmptyResult, Result} from "./result/Result";
import HttpRequest from "./http/HttpRequest";

/**
 * Сервис для работы с тегами
 */
export class TagsService {

    /**
     * Метод для получения списка тегов
     * @returns данные в виде GetTagsResponse или ошибку
     */
    static async getAllTagsAsync(): Promise<Result<ITagDto[]>> {

        const result = await new HttpRequest<ITagDto[]>()
            .withUrl("/tags")
            .withGetMethod()
            .sendAsync()

        if (result.hasError()) {
            return Result.withError(result.getError())
        }

        return Result.ok(result.unwrap())
    }

    /**
     * Метод для получения информации об одном теге
     * @param id тэгу
     * @returns данные в виде IGetTagResponse или ошибку
     */
    static async getTagByIdAsync(id: number): Promise<Result<ITagDto>> {

        const result = await new HttpRequest<ITagDto>()
            .withUrl(`/tags/${id}`)
            .withGetMethod()
            .sendAsync()

        if (result.hasError()) {
            return Result.withError(result.getError())
        }

        return Result.ok(result.unwrap())
    }

    /**
     * Метод для создания тега
     * @param data данные о теге
     * @returns ошибку или null
     */
    static async createTagAsync(data: ICreateTagRequest): Promise<EmptyResult> {

        const result = await HttpRequest.create<void>()
            .withUrl("/tags/")
            .withBody(data)
            .withAuthorization()
            .withPostMethod()
            .sendAsync()

        if (result.hasError()) {
            const error = result.getError()
            return EmptyResult.withError(error)
        }

        return EmptyResult.ok()
    }

    /**
     * Метод для удаления тега
     * @param id тэгу
     * @returns ошибку или null
     */
    static async deleteTagAsync(id: number): Promise<EmptyResult> {

        const result = await HttpRequest.create<void>()
            .withUrl(`/tags/${id}`)
            .withAuthorization()
            .withDeleteMethod()
            .sendAsync()

        if (result.hasError()) {
            const error = result.getError()
            return EmptyResult.withError(error)
        }

        return EmptyResult.ok()
    }

    /**
     * Метод для удаления тега
     * @param id тэгу
     * @param data данные на обновление
     * @returns ошибку или null
     */
    static async updateTagAsync(id: number, data: IUpdateTagRequest): Promise<EmptyResult> {

        const result = await HttpRequest.create<void>()
            .withUrl(`/tags/${id}`)
            .withBody(data)
            .withAuthorization()
            .withPutMethod()
            .sendAsync()

        if (result.hasError()) {
            const error = result.getError()
            return EmptyResult.withError(error)
        }

        return EmptyResult.ok()
    }
}