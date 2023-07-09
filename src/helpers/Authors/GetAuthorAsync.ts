import {IAuthorDTO} from "../../services/models/DTO/IAuthorModels";
import {AuthorServices} from "../../services/AuthorServices";
import {ErrorService} from "../../services/ErrorService";
import {ErrorTypesEnum} from "../../services/models/IError";
import {AlertService} from "../../services/AlertService";

export async function GetAuthorAsync(id: number): Promise<IAuthorDTO | null> {
    const getAuthorResult = await AuthorServices.getAuthorAsync(id)

    if (ErrorService.isError(getAuthorResult)) {

        if (getAuthorResult.errorType === ErrorTypesEnum.Critical) {
            AlertService.errorMessage(getAuthorResult.displayMessage)
            return null
        }

        AlertService.warningMessage(getAuthorResult.displayMessage)
        return null
    }

    return getAuthorResult
}