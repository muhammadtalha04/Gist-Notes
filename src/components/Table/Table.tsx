import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { GistContext } from '../../context/GistContext';
import { deleteGist, getAuthUser } from '../../utils';
import { Gist, GIST_ACTION_TYPES } from '../../utils/types';
import Icon from '../Icon/Icon';
import { Div, TableElement, TBody, TD, TH, THead, TR } from './Style';

interface TableProps {
    gists: Gist[];
}

const Table: React.FC<TableProps> = ({ gists }) => {
    const [loggedIn, setLoggedIn] = useState(false);
    const user = getAuthUser();
    const history = useHistory();
    const { gistDispatch } = GistContext();

    const handleGistEdit = useCallback((id: string) => {
        history.push(`/edit/${id}`);
    }, [history]);

    const handleGistDelete = useCallback((id: string) => {
        const token = window.localStorage.getItem("token");

        if (token !== null) {
            deleteGist(token, id).then((response) => {
                if (response['status'] === 200 || response['status'] === 204) {
                    gistDispatch({ type: GIST_ACTION_TYPES.DELETE_GIST, payload: { id: id } });

                    alert('Gist deleted successfully');
                }
            }).catch((error) => {
                console.log(error);
            });
        }
    }, [gistDispatch]);

    useEffect(() => {
        if (user) {
            setLoggedIn(true);
        } else {
            setLoggedIn(false);
        }
    }, [user, gists, setLoggedIn]);

    return (
        <Div className="table-responsive">
            <TableElement className="table table-striped">
                <THead>
                    <TR>
                        <TH>{"Name"}</TH>
                        <TH>{"Description"}</TH>
                        <TH>{"Date"}</TH>
                        <TH>{"Time"}</TH>
                        <TH>{""}</TH>
                    </TR>
                </THead>
                <TBody className="table-bordered">
                    {loggedIn && gists.map((gist) => {
                        const fileName = Object.keys(gist.files)[0];
                        const desc = (gist.description.length > 30) ? `${gist.description.substring(0, 30)}...` : gist.description;

                        return (
                            <TR key={gist.id} >
                                <TD>{fileName}</TD>
                                <TD>{desc}</TD>
                                <TD>{new Date(gist.updated_at).toLocaleDateString()}</TD>
                                <TD>{new Date(gist.updated_at).toLocaleTimeString()}</TD>
                                <TD>
                                    {
                                        <React.Fragment>
                                            {/* <Icon icon="fa fa-eye" fontSize={10} title="View gist" /> */}
                                            <Icon icon="fa fa-edit" fontSize={10} title="Edit gist" handleClick={() => handleGistEdit(gist.id)} />
                                            <Icon icon="fa fa-trash" fontSize={10} title="Delete gist" handleClick={() => handleGistDelete(gist.id)} />
                                        </React.Fragment>
                                    }
                                </TD>
                            </TR>
                        );
                    })}
                </TBody>
            </TableElement>
        </Div>
    );
}

export default Table;