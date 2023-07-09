import {IBooksResponse} from "../../services/models/responses/IBookResponse";
import {BookService} from "../../services/BookService";
import {ErrorService} from "../../services/ErrorService";
import {ErrorTypesEnum} from "../../services/models/IError";
import {AlertService} from "../../services/AlertService";

export async function GetBooksAsync(): Promise<IBooksResponse | null> {
    const getBooksResult = await BookService.getBooksAsync()

    if (ErrorService.isError(getBooksResult)) {
        if (getBooksResult.errorType === ErrorTypesEnum.Critical) {
            AlertService.errorMessage(getBooksResult.displayMessage)
            return null
        }

        AlertService.warningMessage(getBooksResult.displayMessage)
        return null
    }

    return getBooksResult
}