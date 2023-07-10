import {IError} from "../models/IError";
import {ErrorService} from "../ErrorService";

/**
 * Тип результата. TValue - тип, хранящий в себе результат УСПЕШНОГО выполнения.
 */
export class Result<TValue> {
    private readonly value: TValue | null
    private readonly error: IError | null

    protected constructor(value: TValue | null, error: IError | null) {
        this.value = value
        this.error = error
    }

    /**
     * Возвращает результат успешного выполнения, иначе - выкидывает исключение.
     */
    public unwrap(): TValue {
        if (!this.value) {
            throw new Error("Значение пусто")
        }

        return this.value
    }

    /**
     * Метод проверяет есть ли ошибка.
     */
    public hasError(): boolean {
        return this.error != null
    }

    /**
     * Метод отлавливает ошибку, если она есть. Иначе - бросает исключение.
     */
    public catchError(): void {
        if (this.error === null) {
            throw new Error("Ошибка пуста")
        }

        this.error.catchError()
    }

    /**
     * Метод отлавливает ошибку, если она есть. Иначе - возвращает false.
     */
    public tryCatchError(): boolean {
        if (!this.hasError()) {
            return false
        }

        this.error?.catchError()
        return true
    }

    /**
     * Метод отлавливает ошибку, если она есть. Иначе - бросает исключение.
     */
    public getError(): IError {
        if (!this.error) {
            throw new Error("Ошибка пуста")
        }

        return this.error
    }

    /**
     * Метод возвращает успешное выполнение.
     */
    public static ok<TValue>(value: TValue): Result<TValue> {
        return new Result<TValue>(value, null)
    }

    /**
     * Метод возвращает НЕ успешное выполнение.
     */
    public static withError<TResult>(error: IError): Result<TResult> {
        return new Result<TResult>(null, error)
    }

    /**
     * Метод возвращает НЕ успешное выполнение с заданным сообщением.
     */
    public static withErrorMessage<TResult>(message: string): Result<TResult> {
        return new Result<TResult>(null, ErrorService.commonError(message))
    }
}

/**
 * Класс результа
 */
export class EmptyResult {
    private readonly error: IError | null

    protected constructor(error: IError | null) {
        this.error = error
    }

    /**
     * Метод проверяет есть ли ошибка.
     */
    public hasError(): boolean {
        return this.error != null
    }

    /**
     * Метод отлавливает ошибку, если она есть. Иначе - бросает исключение.
     */
    public catchError(): void {
        if (this.error === null) {
            throw new Error("Ошибка пуста")
        }

        this.error.catchError()
    }

    /**
     * Метод отлавливает ошибку, если она есть. Иначе - возвращает false.
     */
    public tryCatchError(): boolean {
        if (this.error === null) {
            return false
        }

        this.error.catchError()
        return true
    }

    /**
     * Метод отлавливает ошибку, если она есть. Иначе - бросает исключение.
     */
    public getError(): IError {
        if (!this.error) {
            throw new Error("Ошибка пуста")
        }

        return this.error
    }

    /**
     * Метод возвращает успешное выполнение.
     */
    public static ok(): EmptyResult {
        return new EmptyResult(null)
    }

    /**
     * Метод возвращает НЕ успешное выполнение.
     */
    public static withError(error: IError): EmptyResult {
        return new EmptyResult(error)
    }

    /**
     * Метод возвращает НЕ успешное выполнение с заданным сообщением.
     */
    public static withErrorMessage(message: string): EmptyResult {
        return new EmptyResult(ErrorService.commonError(message))
    }
}