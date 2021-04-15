import React from 'react';
import Form from '../../components/Form/Form';
import { Div } from './Style';

interface CreateGistProps {
    handleFileNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleDescriptionChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleContentChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    handleSaveButton: React.MouseEventHandler<HTMLButtonElement>;
    handleCancelButton: React.MouseEventHandler<HTMLButtonElement>;
}

const CreateGist: React.FC<CreateGistProps> = ({ handleFileNameChange, handleDescriptionChange, handleContentChange, handleSaveButton, handleCancelButton }) => {
    return (
        <Div className="container mt-5 mb-5">
            <Form
                handleFileNameChange={handleFileNameChange}
                handleDescriptionChange={handleDescriptionChange}
                handleContentChange={handleContentChange}
                handleSaveButton={handleSaveButton}
                handleCancelButton={handleCancelButton}
            />
        </Div>
    );
}

export default CreateGist;