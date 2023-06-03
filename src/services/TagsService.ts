import {ITagDTO} from "./models/DTO/ITagDTO";
import {IError} from "./models/IError";
import axios from "axios";
import {ICreateTagRequest, IUpdateTagRequest} from "./models/requests/ITagRequests";
import {TokenService} from "./TokenService";
import {IGetTagResponse, IGetTagsResponse} from "./models/responses/IGetTagsResponse";
import {ErrorService} from "./ErrorService";

/**
 * Сервис для работы с тэгами
 */
export class TagsService {

    /**
     * Метод для получения списка тэгов
     * @returns данные в виде IGetTagsResponse или ошибку
     */
    static async getAllTags(): Promise<IGetTagsResponse | IError> {
        try {
            const response = await axios.get<ITagDTO[]>(process.env.REACT_APP_URL_API + "/tags")

            return {
                data: response.data
            }
        }
        catch (err: any) {
            return ErrorService.toServiceError(err, "TagService")
        }
    }

    /**
     * Метод для получения информации о одном тэге
     * @param id тэга
     * @returns данные в виде IGetTagResponse или ошибку
     */
    static async getTagById(id: number): Promise<IGetTagResponse | IError> {
        try {
            const response = await axios.get<IGetTagResponse>(process.env.REACT_APP_URL_API + `/tags/${id}`)

            return response.data
        }
        catch (err: any) {
            return ErrorService.toServiceError(err, "TagService")
        }
    }

    /**
     * Метод для создания тега
     * @param data данные о тэге
     * @returns ошибку или null
     */
    static async createTag(data: ICreateTagRequest): Promise<null | IError> {
        try {
            await axios.post(process.env.REACT_APP_URL_API + "/tags/", data, {
                headers: {
                    Authorization: TokenService.getAccessToken()
                }
            })

            return  null
        }
        catch (err: any) {
            return ErrorService.toServiceError(err, "TagService")
        }
    }

    /**
     * Метод для удаления тега
     * @param id тэга
     * @returns ошибку или null
     */
    static async deleteTag(id: number): Promise<IError | null> {
        try {
            await axios.delete(process.env.REACT_APP_URL_API + `/tags/${id}`,{
                headers: {
                    Authorization: TokenService.getAccessToken()
                }
            })

            return null
        }
        catch (err: any) {
            return ErrorService.toServiceError(err, "TagService")
        }
    }

    /**
     * Метод для удаления тега
     * @param id тэга
     * @param data данные на обновление
     * @returns ошибку или null
     */
    static async updateTag(id: number, data: IUpdateTagRequest): Promise<IError | null> {
        try {
            await axios.put(process.env.REACT_APP_URL_API + `/tags/${id}`, data, {
                headers: {
                    Authorization: TokenService.getAccessToken()
                }
            })

            return null
        }
        catch (err: any) {
            return ErrorService.toServiceError(err, "TagService")
        }
    }
}