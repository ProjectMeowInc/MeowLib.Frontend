import {Result} from "../result/Result";
import axios, {AxiosRequestConfig} from "axios";
import {TokenService} from "../TokenService";
import {ErrorService} from "../ErrorService";

type MethodTypes = "GET" | "POST" | "PUT" | "DELETE"

export default class HttpRequest<TContent> {
    private static BASEURL: string = "https://localhost:7007/api"

    private _needAuthorization: boolean = false
    private _requestUrl: string | null = null
    private _body: object | null = null
    private _method: MethodTypes  = "GET"

    public async sendAsync(): Promise<Result<TContent>> {
        if (!this._requestUrl) {
            throw new Error("Адрес запроса пуст")
        }

        let config: AxiosRequestConfig = {
            baseURL: HttpRequest.BASEURL,
            url: this._requestUrl,
            method: this._method
        }

        if (this._body) {
            config.data = this._body
        }

        if (this._needAuthorization) {
            const getAccessTokenResult = await TokenService.getAccessTokenAsync()
            if (getAccessTokenResult.hasError()) {
                const error = getAccessTokenResult.getError()
                return Result.withError(error)
            }

            const accessToken = getAccessTokenResult.unwrap()
            config.headers = {
                ...config.headers,
                Authorization: accessToken
            }
        }

        try {
            const result = await axios.request<TContent>(config)
            return Result.ok(result.data)
        }
        catch (err: any) {
            return Result.withError(ErrorService.toServiceError(err, "HttpRequest"))
        }
    }

    public withUrl(url: string): HttpRequest<TContent> {
        this._requestUrl = url
        return this
    }

    public withBody(body: object): HttpRequest<TContent> {
        this._body = body
        return this
    }

    public withAuthorization(): HttpRequest<TContent> {
        this._needAuthorization = true
        return this
    }

    public withGetMethod(): HttpRequest<TContent> {
        this._method = "GET"
        return this
    }

    public withDeleteMethod(): HttpRequest<TContent> {
        this._method = "DELETE"
        return this
    }

    public withPostMethod(): HttpRequest<TContent> {
        this._method = "POST"
        return this
    }

    public withPutMethod(): HttpRequest<TContent> {
        this._method = "PUT"
        return this
    }

    public static create<TContent>(): HttpRequest<TContent> {
        return new HttpRequest()
    }

    public static setBaseUrl(url: string): void {
        this.BASEURL = url
    }
}