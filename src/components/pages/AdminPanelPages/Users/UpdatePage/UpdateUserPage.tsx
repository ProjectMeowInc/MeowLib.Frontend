import React, {useState} from 'react';
import styles from "./updateUserPage.module.css";
import {IUpdateUserInfoRequest} from "../../../../../services/models/requests/UserRequests";
import {useParams} from "react-router-dom";
import {AlertService} from "../../../../../services/AlertService";
import {UserService} from "../../../../../services/UserService";
import {RedirectService} from "../../../../../services/RedirectService";

const UpdateUserPage = () => {

    const [userData, setUserData] = useState<IUpdateUserInfoRequest>()
    const params = useParams()

    function UpdateInfoHandler(data: IUpdateUserInfoRequest) {

        setUserData({...userData,
            login: data.login,
            password: data.password,
            role: data.role
        })
    }

    async function SubmitHandler() {

        if (params.id === undefined) {
            return RedirectService.redirectToNotFoundPage()
        }

        if (userData === undefined) {
            return AlertService.warningMessage("Вы не указали изменения")
        }

        const updateUserResult = await UserService.updateUserAsync(parseInt(params.id), userData)

        if (updateUserResult.tryCatchError()) {
            return
        }

        AlertService.successMessage("Информация успешно обновлена")
        return RedirectService.delayRedirectToPrevPage()
    }

    return (
        <div>
            <h1 className={styles.caption}>Обновление информации о пользователе</h1>
            <div className={styles.placeholders}>
                <input
                    className={styles.input}
                    type="text"
                    placeholder={"Введите логин"}
                    onChange={ctx =>
                        UpdateInfoHandler({
                                login: ctx.target.value,
                                password: userData?.password,
                                role: userData?.password
                        })
                    }
                />
                <input
                    className={styles.input}
                    name="tag_description"
                    placeholder={"Введите пароль"}
                    onChange={ctx =>
                        UpdateInfoHandler({
                            login: userData?.login,
                            password: ctx.target.value,
                            role: userData?.password
                        })
                    }
                />
                <select onChange={ctx =>
                    UpdateInfoHandler({
                        login: userData?.login,
                        password: userData?.password,
                        role: ctx.target.value
                    })
                } className={styles.select}>
                    <option value={"User"}>User</option>
                    <option value={"Editor"}>Editor</option>
                    <option value={"Moderator"}>Moderator</option>
                    <option value={"Admin"}>Admin</option>
                </select>

                <button onClick={SubmitHandler} className={styles.button}>Сохранить</button>
            </div>
        </div>
    );
};

export default UpdateUserPage;