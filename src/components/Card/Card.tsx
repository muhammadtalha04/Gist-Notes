import React, { ChangeEventHandler, MouseEventHandler, RefObject } from 'react';
import Headings from '../../constants/headings';
import Button from '../Button/Button';
import Input from '../Input/Input';
import TextArea from '../TextArea/TextArea';
import { Div, DivBody, DivHeader, OuterDiv } from './Style';

interface CardProps {
    fileNameRef: RefObject<HTMLInputElement>;
    descriptionRef: RefObject<HTMLInputElement>;
    contentRef: RefObject<HTMLTextAreaElement>;
    fileName: string;
    description: string;
    content: string;
    handleFileNameChange: ChangeEventHandler<HTMLInputElement>;
    handleDescriptionChange: ChangeEventHandler<HTMLInputElement>;
    handleContentChange: ChangeEventHandler<HTMLTextAreaElement>;
    handleSaveButton: MouseEventHandler<HTMLButtonElement>;
    handleCancelButton: MouseEventHandler<HTMLButtonElement>;
    heading: string;
}

const Card: React.FC<CardProps> = ({ fileName, description, content, fileNameRef, descriptionRef, contentRef, handleFileNameChange, handleDescriptionChange, handleContentChange, handleSaveButton, handleCancelButton, heading }) => {
    return (
        <OuterDiv className="col-sm-8 offset-md-2">
            <DivHeader>
                {heading}
            </DivHeader>

            <DivBody>
                <Div className="form-group">
                    <Input classN="form-control" reference={fileNameRef} value={fileName} handleInputChange={handleFileNameChange} placeholder={Headings.FileNamePlaceholder} />
                </Div>

                <Div className="form-group">
                    <Input classN="form-control" reference={descriptionRef} value={description} handleInputChange={handleDescriptionChange} placeholder={Headings.DescriptionPlaceholder} />
                </Div>

                <Div className="form-group">
                    <TextArea classN="form-control" reference={contentRef} value={content} handleChange={handleContentChange} />
                </Div>

                <Div className="form-group">
                    <Button text="Save" normal={true} onClickHandle={handleSaveButton} />
                    <Button text="Cancel" normal={true} onClickHandle={handleCancelButton} />
                </Div>
            </DivBody>


        </OuterDiv >
    );
}

export default Card;