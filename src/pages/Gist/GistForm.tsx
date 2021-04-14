import React, { useCallback, useEffect } from 'react';
import { useHistory, useRouteMatch } from 'react-router';
import Form from '../../components/Form/Form';
import { GIST_ACTION_TYPES } from '../../constants/action_types';
import Headings from '../../constants/headings';
import { useAuthContext } from '../../context/AuthContext';
import { useFormContext } from '../../context/FormContext';
import { useGistContext } from '../../context/GistContext';
import { URLS } from '../../router/urls';
import { createNewGist, getGist, updateGist } from '../../utils';
import { FormActionTypes, GistPost, Params } from '../../utils/types';
import { Div } from './Style';

const GistForm: React.FC = () => {
    const isCreate = useRouteMatch(URLS.CreateGist);
    const isEdit = useRouteMatch<Params>(URLS.EditGist);

    const history = useHistory();

    const { gistDispatch } = useGistContext();
    const { authState } = useAuthContext();
    const { formState, formDispatch } = useFormContext();

    // This function is triggered on file name change
    const handleFileNameChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        formDispatch({ type: FormActionTypes.SET_FILE_NAME, payload: { fileName: event.target.value } });
    }, [formDispatch]);
    // -------------------------------------------------

    // This function is triggered on description change
    const handleDescriptionChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        formDispatch({ type: FormActionTypes.SET_DESCRIPTION, payload: { description: event.target.value } });
    }, [formDispatch]);
    // -------------------------------------------------

    // This function is triggered on content change
    const handleContentChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
        formDispatch({ type: FormActionTypes.SET_CONTENT, payload: { content: event.target.value } });
    }, [formDispatch]);
    // -------------------------------------------------

    // This function is triggered when user clicks the cancel button
    const handleCancelButton = useCallback(() => {
        // history.push(URLS.Default);
        history.goBack();
    }, [history]);
    // -------------------------------------------------

    // This function is triggered when user clicks the save/update button
    const handleSaveButton = useCallback(() => {
        if (formState.fileName !== "" && formState.content !== "") {
            const data: GistPost = {
                files: {
                },
                description: formState.description,
                public: true
            };
            data.files[formState.fileName] = {
                content: formState.content
            };

            if (authState.token != null) {
                if (isCreate !== null) {
                    createNewGist(authState.token, data).then((data) => {
                        if (data !== null) {
                            gistDispatch({ type: GIST_ACTION_TYPES.ADD_GIST, payload: data })

                            alert("Gist created successfully");

                            history.push(URLS.Default);
                        }
                    });
                } else if (isEdit !== null) {
                    gistDispatch({ type: GIST_ACTION_TYPES.EDIT_GIST, payload: { data: data, id: isEdit.params.id } });

                    updateGist(authState.token, data, isEdit.params.id).then((data) => {
                        if (data !== null) {
                            alert("Gist updated successfully");

                            history.push(URLS.Default);
                        }
                    });
                }
            }
        } else {
            alert("Filename and content are required");
        }
    }, [formState, history, gistDispatch, authState, isCreate, isEdit]);
    // -------------------------------------------------

    useEffect(() => {
        if (authState.token !== null && isEdit !== null && formState.fileName === "") {
            getGist(isEdit.params.id, authState.token).then((data) => {
                if (data) {
                    const dataFileName = Object.keys(data['files'])[0];

                    formDispatch({ type: FormActionTypes.SET_FILE_NAME, payload: { fileName: dataFileName } });
                    formDispatch({ type: FormActionTypes.SET_DESCRIPTION, payload: { description: data['description'] } });
                    formDispatch({ type: FormActionTypes.SET_CONTENT, payload: { content: data['files'][dataFileName]['content'] } });
                }
            });
        }
    }, [authState, isEdit, formState.fileName, formDispatch]);

    useEffect(() => {
        if (isEdit !== null) {
            formDispatch({ type: FormActionTypes.SET_HEADING, payload: { heading: Headings.EditGist } });
        } else if (isCreate !== null) {
            formDispatch({ type: FormActionTypes.SET_HEADING, payload: { heading: Headings.CreateGist } });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formDispatch]);

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

export default GistForm;