import React from 'react';
import { TextAreaElement } from './Style';

interface TextAreaProps {
    classN?: string;
    value: string;
    handleChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextArea: React.FC<TextAreaProps> = ({ classN, value, handleChange }) => {
    return (
        <TextAreaElement className={classN} rows={10} onChange={handleChange} value={value} />
    );
}

export default TextArea;