import React, { useCallback, useRef, useState } from 'react';
import { useHistory } from 'react-router';
import Card from '../../components/Card/Card';
import { GistContext } from '../../context/GistContext';
import { createNewGist } from '../../utils';
import { GistPost, GIST_ACTION_TYPES } from '../../utils/types';
import { Div } from './Style';

const CreateGist: React.FC = () => {
    const fileNameRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLInputElement>(null);
    const contentRef = useRef<HTMLTextAreaElement>(null);
    const [fileName, setFileName] = useState("");
    const [description, setDescription] = useState("");
    const [content, setContent] = useState("");
    const history = useHistory();
    const { gistDispatch } = GistContext();

    const handleFileNameChange = useCallback(() => {
        if (fileNameRef.current?.value !== undefined) {
            setFileName(fileNameRef.current.value);
        }
    }, []);

    const handleDescriptionChange = useCallback(() => {
        if (descriptionRef.current?.value !== undefined) {
            setDescription(descriptionRef.current.value);
        }
    }, []);

    const handleContentChange = useCallback(() => {
        if (contentRef.current?.value !== undefined) {
            setContent(contentRef.current.value);
        }
    }, []);

    const handleSaveButton = useCallback(() => {
        if (fileName !== "" && content !== "") {
            const token = window.localStorage.getItem("token");
            const data: GistPost = {
                files: {
                },
                description: description,
                public: false
            };
            data.files[fileName] = {
                content: content
            };

            if (token != null) {
                createNewGist(token, data).then((data) => {
                    if (data !== null) {
                        gistDispatch({ type: GIST_ACTION_TYPES.ADD_GIST, payload: data })

                        alert("Gist created successfully");

                        history.push('/');
                    }
                });
            }
        } else {
            alert("Filename and content are required");
        }
    }, [fileName, description, content, history, gistDispatch]);

    const handleCancelButton = useCallback(() => {
        history.push('/');
    }, [history]);

    return (
        <Div className="container mt-5 mb-5">
            <Card
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
                mode="create"
            />
        </Div>
    );
}

export default CreateGist;