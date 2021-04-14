import React, { MouseEventHandler } from 'react';
import Headings from '../../constants/headings';
import { useFormContext } from '../../context/FormContext';
import Button from '../Button/Button';
import Input from '../Input/Input';
import TextArea from '../TextArea/TextArea';
import { Div, DivBody, DivHeader, OuterDiv } from './Style';

interface FormProps {
    handleFileNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleDescriptionChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleContentChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    handleSaveButton: MouseEventHandler<HTMLButtonElement>;
    handleCancelButton: MouseEventHandler<HTMLButtonElement>;
}

const Form: React.FC<FormProps> = ({ handleFileNameChange, handleDescriptionChange, handleContentChange, handleSaveButton, handleCancelButton }) => {
    const { formState } = useFormContext();

    return (
        <OuterDiv className="col-sm-8 offset-md-2">
            <DivHeader>
                {formState.heading}
            </DivHeader>

            <DivBody>
                <Div className="form-group">
                    <Input classN="form-control" value={formState.fileName} handleInputChange={handleFileNameChange} placeholder={Headings.FileNamePlaceholder} />
                </Div>

                <Div className="form-group">
                    <Input classN="form-control" value={formState.description} handleInputChange={handleDescriptionChange} placeholder={Headings.DescriptionPlaceholder} />
                </Div>

                <Div className="form-group">
                    <TextArea classN="form-control" value={formState.content} handleChange={handleContentChange} />
                </Div>

                <Div className="form-group">
                    <Button text="Save" normal={true} onClickHandle={handleSaveButton} />
                    <Button text="Cancel" normal={true} onClickHandle={handleCancelButton} />
                </Div>
            </DivBody>


        </OuterDiv >
    );
}

export default Form;