import React from 'react';
import { IconButton } from './Style';

interface IconProps {
    icon: string;
    fontSize: number;
    title: string;
    handleClick?: React.MouseEventHandler<HTMLButtonElement>

}

const Icon: React.FC<IconProps> = ({ icon, fontSize, title, handleClick }) => {

    return (
        <IconButton fontSize={fontSize} className="btn" title={title} onClick={handleClick}>
            <i className={icon}></i>
        </IconButton>
    );
}

export default Icon;