import React, { RefObject } from 'react';
import { InputElement } from './Style';

interface InputProps {
    reference: RefObject<HTMLInputElement>;
    handleInputChange: React.ChangeEventHandler<HTMLInputElement>;
    value: string;
    placeholder: string;
    classN?: string;
}

const Input: React.FC<InputProps> = ({ value, reference, handleInputChange, placeholder, classN }) => {
    return (
        <InputElement className={classN} ref={reference} type="text" value={value} onChange={handleInputChange} placeholder={placeholder} />
    );
}

export default Input;