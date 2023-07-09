import {ChapterService} from "../../services/ChapterService";
import {IChapterDTO} from "../../services/models/DTO/IChapterDTO";
import {ErrorService} from "../../services/ErrorService";
import {ErrorTypesEnum} from "../../services/models/IError";
import {AlertService} from "../../services/AlertService";

export async function GetChaptersAsync(bookId: number):Promise<IChapterDTO[] | null> {
    const getChaptersResult = await ChapterService.getChaptersAsync(bookId)

    if (ErrorService.isError(getChaptersResult)) {
        if (getChaptersResult.errorType === ErrorTypesEnum.Critical) {
            AlertService.errorMessage(getChaptersResult.displayMessage)
            return null
        }

        AlertService.warningMessage(getChaptersResult.displayMessage)
        return null
    }

    return getChaptersResult
}