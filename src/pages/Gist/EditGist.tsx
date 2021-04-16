import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { FormActionTypes } from '../../constants/action_types';
import { getGist } from '../../utils';
import { match } from 'react-router';
import { Div } from './Style';
import Form from '../../components/Form/Form';
import { Params } from '../../types';

interface EditGistProps {
    match: match<Params>;
    handleFileNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleDescriptionChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleContentChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    handleSaveButton: React.MouseEventHandler<HTMLButtonElement>;
    handleCancelButton: React.MouseEventHandler<HTMLButtonElement>;
}

const EditGist: React.FC<EditGistProps> = ({ match, handleFileNameChange, handleDescriptionChange, handleContentChange, handleSaveButton, handleCancelButton }) => {
    const dispatch = useDispatch();
    const [token, fileName] = useSelector((state: RootState) => [
        state.auth.token,
        state.form.fileName
    ]);

    useEffect(() => {
        if (token !== null && match !== null && fileName === "") {
            getGist(match.params.id, token).then((data) => {
                if (data) {
                    const dataFileName = Object.keys(data['files'])[0];

                    dispatch({ type: FormActionTypes.SET_FILE_NAME, payload: { fileName: dataFileName } });
                    dispatch({ type: FormActionTypes.SET_DESCRIPTION, payload: { description: data['description'] } });
                    dispatch({ type: FormActionTypes.SET_CONTENT, payload: { content: data['files'][dataFileName]['content'] } });
                }
            });
        }
    }, [token, match, fileName, dispatch]);

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

export default EditGist;