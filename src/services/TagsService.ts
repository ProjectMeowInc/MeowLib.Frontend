import {ITagDTO} from "./models/DTO/ITagDTO";
import axios from "axios";
import {ICreateTagRequest, IUpdateTagRequest} from "./models/requests/ITagRequests";
import {TokenService} from "./TokenService";
import {IGetTagResponse} from "./models/responses/IGetTagsResponse";
import {ErrorService} from "./ErrorService";
import {EmptyResult, Result} from "./result/Result";

/**
 * Сервис для работы с тегами
 */
export class TagsService {

    /**
     * Метод для получения списка тегов
     * @returns данные в виде IGetTagsResponse или ошибку
     */
    static async getAllTagsAsync(): Promise<Result<ITagDTO[]>> {
        try {
            const response = await axios.get<ITagDTO[]>(process.env.REACT_APP_URL_API + "/tags")

            return Result.ok(response.data)
        }
        catch (err: any) {
            return Result.withError(ErrorService.toServiceError(err, "TagService"))
        }
    }

    /**
     * Метод для получения информации об одном теге
     * @param id тэгу
     * @returns данные в виде IGetTagResponse или ошибку
     */
    static async getTagByIdAsync(id: number): Promise<Result<ITagDTO>> {
        try {
            const response = await axios.get<IGetTagResponse>(process.env.REACT_APP_URL_API + `/tags/${id}`)

            return Result.ok(response.data)
        }
        catch (err: any) {
            return Result.withError(ErrorService.toServiceError(err, "TagService"))
        }
    }

    /**
     * Метод для создания тега
     * @param data данные о теге
     * @returns ошибку или null
     */
    static async createTagAsync(data: ICreateTagRequest): Promise<EmptyResult> {
        try {
            await axios.post(process.env.REACT_APP_URL_API + "/tags/", data, {
                headers: {
                    Authorization: await TokenService.getAccessTokenAsync()
                }
            })

            return EmptyResult.ok()
        }
        catch (err: any) {
            return EmptyResult.withError(ErrorService.toServiceError(err, "TagService"))
        }
    }

    /**
     * Метод для удаления тега
     * @param id тэгу
     * @returns ошибку или null
     */
    static async deleteTagAsync(id: number): Promise<EmptyResult> {
        try {
            await axios.delete(process.env.REACT_APP_URL_API + `/tags/${id}`,{
                headers: {
                    Authorization: await TokenService.getAccessTokenAsync()
                }
            })

            return EmptyResult.ok()
        }
        catch (err: any) {
            return EmptyResult.withError(ErrorService.toServiceError(err, "TagService"))
        }
    }

    /**
     * Метод для удаления тега
     * @param id тэгу
     * @param data данные на обновление
     * @returns ошибку или null
     */
    static async updateTagAsync(id: number, data: IUpdateTagRequest): Promise<EmptyResult> {
        try {
            await axios.put(process.env.REACT_APP_URL_API + `/tags/${id}`, data, {
                headers: {
                    Authorization: await TokenService.getAccessTokenAsync()
                }
            })

            return EmptyResult.ok()
        }
        catch (err: any) {
            return EmptyResult.withError(ErrorService.toServiceError(err, "TagService"))
        }
    }
}