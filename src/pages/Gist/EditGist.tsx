import React, { useCallback, useEffect, useRef, useState } from 'react';
import { RouteComponentProps, useHistory } from 'react-router';
import Card from '../../components/Card/Card';
import { GistContext } from '../../context/GistContext';
import { getGist, updateGist } from '../../utils';
import { GistPost, GIST_ACTION_TYPES } from '../../utils/types';
import { Div } from './Style';

interface Params {
    id: string;
}

const EditGist: React.FC<RouteComponentProps<Params>> = ({ match }) => {
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
                updateGist(token, data, match.params.id).then((data) => {
                    if (data !== null) {
                        gistDispatch({ type: GIST_ACTION_TYPES.EDIT_GIST, payload: { data: data, id: match.params.id } });

                        alert("Gist updated successfully");

                        history.push('/');
                    }
                });
            }
        } else {
            alert("Filename and content are required");
        }
    }, [fileName, description, content, history, match.params.id, gistDispatch]);

    const handleCancelButton = useCallback(() => {
        history.push('/');
    }, [history]);

    useEffect(() => {
        const token = window.localStorage.getItem("token");

        if (token !== null) {
            getGist(match.params.id, token).then((data) => {
                if (data) {
                    const dataFileName = Object.keys(data['files'])[0];

                    setFileName(dataFileName);
                    setDescription(data['description']);
                    setContent(data['files'][dataFileName]['content']);
                }
            });
        }
    }, [match]);

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
                mode="edit"
            />
        </Div>
    );
}

export default EditGist;