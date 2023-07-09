import {TagsService} from "../../services/TagsService";
import {IGetTagsResponse} from "../../services/models/responses/IGetTagsResponse";
import {ErrorService} from "../../services/ErrorService";
import {AlertService} from "../../services/AlertService";
import {ErrorTypesEnum} from "../../services/models/IError";

export async function GetTagsAsync(): Promise<IGetTagsResponse | null> {
    const response = await TagsService.getAllTagsAsync()

    if (ErrorService.isError(response)) {

        if (response.errorType === ErrorTypesEnum.Critical) {
            AlertService.errorMessage(response.displayMessage)
            return null
        }

        AlertService.warningMessage(response.displayMessage)
        return null
    }

    return {
        data: response.data
    }
}