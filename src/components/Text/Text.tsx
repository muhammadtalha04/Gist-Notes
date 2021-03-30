import React from 'react';
import { TextElement } from './Style';

interface TextProps {
    text: string;
    fontWeight: string;
    color: string;
}

const Text: React.FC<TextProps> = ({ text, fontWeight, color }) => {
    return (
        <TextElement fontWeight={fontWeight} color={color}>
            {text}
        </TextElement>
    );
}

export default Text;