import React, { MouseEventHandler } from 'react';
import { TextElement } from './Style';

interface TextProps {
    text: string;
    fontWeight: string;
    color: string;
    classN?: string;
    fontSize?: string;
    handleClick?: MouseEventHandler<HTMLParagraphElement>;
}

const Text: React.FC<TextProps> = ({ text, fontWeight, color, classN, fontSize, handleClick }) => {
    return (
        <TextElement className={classN} fontWeight={fontWeight} color={color} fontSize={fontSize} onClick={handleClick}>
            {text}
        </TextElement>
    );
}

export default Text;