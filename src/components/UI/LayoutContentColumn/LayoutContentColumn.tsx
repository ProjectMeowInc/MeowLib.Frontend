import React, {ReactNode} from 'react';
import classes from "./layoutContentColumn.module.css"
import LayoutContentItem from "../LayoutContentItem/LayoutContentItem";

interface ILayoutContentColumnProps {
    elements: ReactNode[]
    flex?: number
}

const LayoutContentColumn = ({elements, flex}: ILayoutContentColumnProps) => {

    return (
        <div className={classes.column} style={{flex: flex ?? 1}}>
            {
                elements.map(element => (
                    <LayoutContentItem>
                        {element}
                    </LayoutContentItem>
                ))
            }


        </div>
    );
};

export default LayoutContentColumn;