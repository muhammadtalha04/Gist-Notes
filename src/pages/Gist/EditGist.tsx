import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import Form from '../../components/Form/Form';
import { GIST_ACTION_TYPES } from '../../constants/action_types';
import Headings from '../../constants/headings';
import { useAuthContext } from '../../context/AuthContext';
import { useGistContext } from '../../context/GistContext';
import { URLS } from '../../router/urls';
import { getGist, updateGist } from '../../utils';
import { GistPost } from '../../utils/types';
import { Div } from './Style';

interface Params {
    id: string;
}

const EditGist: React.FC = () => {
    const fileNameRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLInputElement>(null);
    const contentRef = useRef<HTMLTextAreaElement>(null);
    const [fileName, setFileName] = useState("");
    const [description, setDescription] = useState("");
    const [content, setContent] = useState("");
    const history = useHistory();
    const match = useRouteMatch<Params>(URLS.EditGist);
    const { gistDispatch } = useGistContext();
    const { authState } = useAuthContext();

    const handleFileNameChange = useCallback(() => {
        if (fileNameRef.current?.value !== undefined) {
            setFileName(fileNameRef.current.value);
        }
    }, [fileNameRef]);

    const handleDescriptionChange = useCallback(() => {
        if (descriptionRef.current?.value !== undefined) {
            setDescription(descriptionRef.current.value);
        }
    }, [descriptionRef]);

    const handleContentChange = useCallback(() => {
        if (contentRef.current?.value !== undefined) {
            setContent(contentRef.current.value);
        }
    }, [contentRef]);

    const handleSaveButton = useCallback(() => {
        if (fileName !== "" && content !== "") {
            const data: GistPost = {
                files: {
                },
                description: description,
                public: true
            };
            data.files[fileName] = {
                content: content
            };

            if (authState.token != null && match !== null) {
                gistDispatch({ type: GIST_ACTION_TYPES.EDIT_GIST, payload: { data: data, id: match.params.id } });

                updateGist(authState.token, data, match.params.id).then((data) => {
                    if (data !== null) {
                        alert("Gist updated successfully");

                        history.push(URLS.Default);
                    }
                });
            }
        } else {
            alert("Filename and content are required");
        }
    }, [fileName, description, content, history, match, gistDispatch, authState]);

    const handleCancelButton = useCallback(() => {
        history.push(URLS.Default);
    }, [history]);

    useEffect(() => {
        if (authState.token !== null && match !== null) {
            getGist(match.params.id, authState.token).then((data) => {
                if (data) {
                    const dataFileName = Object.keys(data['files'])[0];

                    setFileName(dataFileName);
                    setDescription(data['description']);
                    setContent(data['files'][dataFileName]['content']);
                }
            });
        }
    }, [match, authState]);

    return (
        <Div className="container mt-5 mb-5">
            <Form
                fileName={fileName}
                description={description}
                content={content}
                fileNameRef={fileNameRef}
                descriptionRef={descriptionRef}
                contentRef={contentRef}
                handleFileNameChange={handleFileNameChange}
                handleDescriptionChange={handleDescriptionChange}
                handleContentChange={handleContentChange}
                handleSaveButton={handleSaveButton}
                handleCancelButton={handleCancelButton}
                heading={Headings.EditGist}
            />
        </Div>
    );
}

export default EditGist;