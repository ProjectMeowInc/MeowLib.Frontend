import {AuthorServices} from "../../services/AuthorServices";
import {ErrorService} from "../../services/ErrorService";
import {ErrorTypesEnum} from "../../services/models/IError";
import {AlertService} from "../../services/AlertService";
import {IAuthorDTO} from "../../services/models/DTO/IAuthorModels";

export async function GetAuthorsAsync(): Promise<IAuthorDTO[] | null> {
    const getAuthorsResult = await AuthorServices.getAuthorsAsync()

    if (ErrorService.isError(getAuthorsResult)) {
        if (getAuthorsResult.errorType === ErrorTypesEnum.Critical) {
            AlertService.errorMessage(getAuthorsResult.displayMessage)
            return null
        }

        AlertService.warningMessage(getAuthorsResult.displayMessage)
        return null
    }

    return getAuthorsResult.data
}