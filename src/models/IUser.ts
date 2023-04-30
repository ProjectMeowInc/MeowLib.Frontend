import {IErrorResponse} from "./Responses";


export interface IValidationErrorResponse extends IErrorResponse{
    validationErrors: [
        {
            propertyName: string,
            message: string,
        }
    ]
}