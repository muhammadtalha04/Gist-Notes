import React, { useCallback, useEffect } from 'react';
import { useHistory, useRouteMatch } from 'react-router';
import Form from '../../components/Form/Form';
import { FormActionTypes, GIST_ACTION_TYPES } from '../../constants/action_types';
import Headings from '../../constants/headings';
import { URLS } from '../../router/urls';
import { createNewGist, updateGist } from '../../utils';
import { GistPost, Params } from '../../types';
import { Div } from './Style';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import EditGist from './EditGist';
import CreateGist from './CreateGist';

const GistForm: React.FC = () => {
    const isCreate = useRouteMatch(URLS.CreateGist);
    const isEdit = useRouteMatch<Params>(URLS.EditGist);

    const history = useHistory();

    const dispatch = useDispatch();
    const [formState, token] = useSelector((state: RootState) => [
        state.form,
        state.auth.token
    ]);

    // This function is triggered on file name change
    const handleFileNameChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({ type: FormActionTypes.SET_FILE_NAME, payload: { fileName: event.target.value } });
    }, [dispatch]);
    // -------------------------------------------------

    // This function is triggered on description change
    const handleDescriptionChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({ type: FormActionTypes.SET_DESCRIPTION, payload: { description: event.target.value } });
    }, [dispatch]);
    // -------------------------------------------------

    // This function is triggered on content change
    const handleContentChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
        dispatch({ type: FormActionTypes.SET_CONTENT, payload: { content: event.target.value } });
    }, [dispatch]);
    // -------------------------------------------------

    // This function is triggered when user clicks the cancel button
    const handleCancelButton = useCallback(() => {
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

            if (token != null) {
                if (isCreate !== null) {
                    createNewGist(token, data).then((data) => {
                        if (data !== null) {
                            dispatch({ type: GIST_ACTION_TYPES.ADD_GIST, payload: data })

                            alert("Gist created successfully");

                            dispatch({ type: FormActionTypes.CLEAR_FORM });
                            history.goBack();
                        }
                    });
                } else if (isEdit !== null) {
                    dispatch({ type: GIST_ACTION_TYPES.EDIT_GIST, payload: { data: data, id: isEdit.params.id } });

                    updateGist(token, data, isEdit.params.id).then((data) => {
                        if (data !== null) {
                            alert("Gist updated successfully");

                            dispatch({ type: FormActionTypes.CLEAR_FORM });
                            history.goBack();
                        }
                    });
                }
            }
        } else {
            alert("Filename and content are required");
        }
    }, [formState, history, dispatch, token, isCreate, isEdit]);
    // -------------------------------------------------

    useEffect(() => {
        dispatch({ type: FormActionTypes.CLEAR_FORM });
        if (isEdit !== null) {
            dispatch({ type: FormActionTypes.SET_HEADING, payload: { heading: Headings.EditGist } });
        } else if (isCreate !== null) {
            dispatch({ type: FormActionTypes.SET_HEADING, payload: { heading: Headings.CreateGist } });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    return (
        <React.Fragment>
            {
                (isCreate !== null) &&
                (
                    <CreateGist
                        handleFileNameChange={handleFileNameChange}
                        handleDescriptionChange={handleDescriptionChange}
                        handleContentChange={handleContentChange}
                        handleSaveButton={handleSaveButton}
                        handleCancelButton={handleCancelButton}
                    />
                )
            }
            {
                (isEdit !== null) &&
                (
                    <EditGist
                        match={isEdit}
                        handleFileNameChange={handleFileNameChange}
                        handleDescriptionChange={handleDescriptionChange}
                        handleContentChange={handleContentChange}
                        handleSaveButton={handleSaveButton}
                        handleCancelButton={handleCancelButton}
                    />
                )
            }
        </React.Fragment>


    );
}

export default GistForm;