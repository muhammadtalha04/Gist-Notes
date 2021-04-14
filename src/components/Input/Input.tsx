import React from 'react';
import { InputElement } from './Style';

interface InputProps {
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    value: string;
    placeholder: string;
    classN?: string;
}

const Input: React.FC<InputProps> = ({ value, handleInputChange, placeholder, classN }) => {
    return (
        <InputElement className={classN} type="text" value={value} onChange={handleInputChange} placeholder={placeholder} />
    );
}

export default Input;