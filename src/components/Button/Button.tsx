import React from 'react';
import { NormalButton, StyledButton } from './Style';

interface ButtonProps {
    text: string;
    onClickHandle: React.MouseEventHandler<HTMLButtonElement>
    normal?: boolean;
}

const Button: React.FC<ButtonProps> = ({ text, onClickHandle, normal }) => {
    return (
        <React.Fragment>
            {
                (normal !== undefined && normal === true) ?
                    (<NormalButton onClick={onClickHandle} className="btn">{text}</NormalButton>) :
                    (<StyledButton onClick={onClickHandle} className="btn">{text}</StyledButton>)
            }
        </React.Fragment>
    );
}

export default Button;