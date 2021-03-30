import React, { RefObject } from 'react';
import { TextAreaElement } from './Style';

interface TextAreaProps {
    classN?: string;
    reference: RefObject<HTMLTextAreaElement>;
    value: string;
    handleChange: React.ChangeEventHandler<HTMLTextAreaElement>;
}

const TextArea: React.FC<TextAreaProps> = ({ classN, reference, value, handleChange }) => {
    return (
        <TextAreaElement ref={reference} className={classN} rows={10} onChange={handleChange} value={value} />
    );
}

export default TextArea;