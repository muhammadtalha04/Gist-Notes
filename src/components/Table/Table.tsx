import React from 'react';
import { Gist } from '../../utils/types';
import Icon from '../Icon/Icon';
import { Div, TableElement, TBody, TD, TH, THead, TR } from './Style';

interface TableProps {
    gists: Gist[];
    handleGistEdit: (id: string) => void;
    handleGistDelete: (id: string) => void;
    loggedIn: boolean;
}

const Table: React.FC<TableProps> = ({ gists, loggedIn, handleGistEdit, handleGistDelete }) => {
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