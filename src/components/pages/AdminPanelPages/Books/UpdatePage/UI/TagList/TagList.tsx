import React from 'react';
import styles from './tagList.module.css';
import {GetTagsResponse} from "../../../../../../../services/models/responses/GetTagsResponse";
import TagListItem from "../TagListItem/TagListItem";

const TagList = ({data}: GetTagsResponse) => {

    if (data === null) {
        return (
            <p>Здесь пока ничего нет</p>
        )
    }

    return (
        <div className={styles.tags}>
            {
                data.map(tag => (
                    <TagListItem key={tag.id} id={tag.id} name={tag.name} description={tag.description}/>
                ))
            }
        </div>
    );
};

export default TagList;