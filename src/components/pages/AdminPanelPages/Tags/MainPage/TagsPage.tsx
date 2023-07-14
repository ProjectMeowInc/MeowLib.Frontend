import React, {useEffect, useState} from 'react';
import styles from "./tagsPage.module.css"
import Preloader from "../../../../UI/Preloader/Preloader";
import TagsPageListItem from "../UI/TagsPageListItem/TagsPageListItem";
import {ITagDTO} from "../../../../../services/models/DTO/ITagDTO";
import {TagsService} from "../../../../../services/TagsService";
import {Link} from "react-router-dom";

const TagsPage = () => {
    const [tagList, setTagList] = useState<ITagDTO[]>([])
    const [displayTagList, setDisplayTagList] = useState<ITagDTO[] | null>(null)

    useEffect(() => {
        TagsService.getAllTagsAsync().then(getTagsResult => {

            if (getTagsResult.tryCatchError()) {
                return
            }

            const tagList = getTagsResult.unwrap()

            setTagList(tagList)
            setDisplayTagList(tagList)
        })
    }, [])

    function SearchHandler(name: string) {

        if (name.length === 0) {
            setDisplayTagList(tagList)
        }

        setDisplayTagList(tagList.filter(tag => tag.name?.includes(name)))
    }

    return (
        <div className={styles.wrapper}>
            <h1 className={styles.header}>Управление тэгами</h1>

            <Link to={"new"} className={styles.add_button}>
                <p>Нажмите чтобы добавить нового тэга</p>
            </Link>

            <input className={styles.search} onChange={ctx => SearchHandler(ctx.target.value)} type="text" placeholder={"Введите название тэга"}/>

            {displayTagList === null
                ? <Preloader/>
                : displayTagList.length === 0
                    ? <p className={styles.empty}>Здесь пока ничего нет</p>
                    : displayTagList.map(tag => (
                        <TagsPageListItem key={tag.id} id={tag.id} name={tag.name} description={tag.description}/>
                    ))
            }
        </div>
    );
};

export default TagsPage;