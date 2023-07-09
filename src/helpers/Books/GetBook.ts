import {IBook} from "../../services/models/DTO/IBookDTO";
import {BookService} from "../../services/BookService";
import {ErrorService} from "../../services/ErrorService";
import {AlertService} from "../../services/AlertService";
import {ErrorTypesEnum} from "../../services/models/IError";

export async function GetBookAsync(id: number): Promise <IBook | null> {
    const response = await BookService.getBookAsync(id)

    if (ErrorService.isError(response)) {
        if (response.errorType === ErrorTypesEnum.Critical) {
            AlertService.errorMessage(response.displayMessage)
            return null
        }

        AlertService.warningMessage(response.displayMessage)
        return null
    }

    return response
}