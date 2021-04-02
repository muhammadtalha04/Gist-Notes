import React, { useCallback, useRef, useState } from 'react';
import { useHistory } from 'react-router';
import Form from '../../components/Form/Form';
import { GIST_ACTION_TYPES } from '../../constants/action_types';
import Headings from '../../constants/headings';
import { useAuthContext } from '../../context/AuthContext';
import { useGistContext } from '../../context/GistContext';
import { URLS } from '../../router/urls';
import { createNewGist } from '../../utils';
import { GistPost } from '../../utils/types';
import { Div } from './Style';

const CreateGist: React.FC = () => {
    const fileNameRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLInputElement>(null);
    const contentRef = useRef<HTMLTextAreaElement>(null);
    const [fileName, setFileName] = useState("");
    const [description, setDescription] = useState("");
    const [content, setContent] = useState("");
    const history = useHistory();
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

            if (authState.token != null) {
                createNewGist(authState.token, data).then((data) => {
                    if (data !== null) {
                        gistDispatch({ type: GIST_ACTION_TYPES.ADD_GIST, payload: data })

                        alert("Gist created successfully");

                        history.push(URLS.Default);
                    }
                });
            }
        } else {
            alert("Filename and content are required");
        }
    }, [fileName, description, content, history, gistDispatch, authState]);

    const handleCancelButton = useCallback(() => {
        history.push(URLS.Default);
    }, [history]);

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
                heading={Headings.CreateGist}
            />
        </Div>
    );
}

export default CreateGist;