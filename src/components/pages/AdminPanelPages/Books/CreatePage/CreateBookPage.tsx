import React, {useState} from 'react';
import styles from "./createBookPage.module.css"
import {ICreateBookRequest} from "../../../../../services/models/requests/BookRequests";
import {BookService} from "../../../../../services/BookService";
import {AlertService} from "../../../../../services/AlertService";
import {RedirectService} from "../../../../../services/RedirectService";

const CreateBookPage = () => {
    const [bookData, setBookData] = useState<ICreateBookRequest>()

    async function SubmitHandler(): Promise<void> {

        if (bookData === undefined) {
            return AlertService.warningMessage("Заполните поля")
        }

        const createBookResult = await BookService.createBookAsync(bookData)

        if (createBookResult.tryCatchError()) {
            return
        }

        AlertService.successMessage("Книга успешно создана")

        return RedirectService.delayRedirectToPrevPage()
    }

    function ChangeHandler(data: ICreateBookRequest): void {
        setBookData({...bookData, name: data.name, description: data.description})
    }

    return (
        <div>
            <h1 className={styles.caption}>Добавление новой книги</h1>
            <div className={styles.placeholders}>
                <input onChange={(ctx) => {ChangeHandler({
                    name: ctx.target.value,
                    description: bookData?.description ?? ""
                })}} className={styles.input} type="text" placeholder={'Введите название книги'}/>
                <textarea onChange={(ctx) => setBookData({
                    name: bookData?.name ?? "",
                    description: ctx.target.value
                })} className={styles.textarea} name="tag_description" placeholder={"Введите описание книги"}/>
                <button onClick={SubmitHandler} className={styles.button}>Создать</button>
            </div>
        </div>
    );
};

export default CreateBookPage;