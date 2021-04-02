import React from 'react';
import { Span, I, IconButton } from './Style';

interface IconProps {
    icon: string;
    fontSize: number;
    title: string;
    simple: boolean;
    handleClick?: React.MouseEventHandler<HTMLButtonElement>
    text?: string;
    color?: string;
    border?: boolean;
}

const Icon: React.FC<IconProps> = ({ icon, fontSize, title, simple, text, color, border, handleClick }) => {

    return (
        <React.Fragment>
            {
                (simple === true) ?
                    (
                        <Span fontSize={fontSize} title={title} color={color} border={border} onClick={handleClick}>
                            <I className={icon}></I >
                            {
                                (text !== undefined) && (" " + text)
                            }
                        </Span>
                    ) :
                    (

                        <IconButton fontSize={fontSize} className="btn" title={title} onClick={handleClick}>
                            <I className={icon}></I >
                        </IconButton >
                    )
            }
        </React.Fragment>
    );
}

export default Icon;