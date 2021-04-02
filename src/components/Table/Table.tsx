import React from 'react';
import { Colors } from '../../constants/colors';
import { Gist } from '../../utils/types';
import Icon from '../Icon/Icon';
import Image from '../Image/Image';
import Text from '../Text/Text';
import { Div, TableElement, TBody, TD, TH, THead, TR } from './Style';

interface TableProps {
    gists: Gist[];
    handleGistView: (id: string) => void;
    handleGistEdit: (id: string) => void;
    handleGistDelete: (id: string) => void;
    handleGistStar: (id: string) => void;
    handleGistFork: (id: string) => void;
    loggedIn: boolean;
    username: string;
}

const Table: React.FC<TableProps> = ({ gists, loggedIn, username, handleGistView, handleGistEdit, handleGistDelete, handleGistStar, handleGistFork }) => {
    return (
        <Div className="table-responsive">
            <TableElement className="table table-striped">
                <THead>
                    {/* <TR>
                        <TH>{"Name"}</TH>
                        <TH>{"Description"}</TH>
                        <TH>{"Date"}</TH>
                        <TH>{"Time"}</TH>
                        <TH>{""}</TH>
                    </TR> */}
                    <TR>
                        <TH></TH>
                        <TH>{"Name"}</TH>
                        <TH>{"Date"}</TH>
                        <TH>{"Time"}</TH>
                        <TH>{"Keyword"}</TH>
                        <TH>{"Notebook Name"}</TH>
                        <TH>{""}</TH>
                    </TR>
                </THead>
                <TBody className="table-bordered">
                    {loggedIn && gists.map((gist) => {
                        let fileName = Object.keys(gist.files)[0];
                        fileName = (fileName.length > 30) ? `${fileName.substring(0, 30)}...` : fileName;
                        const desc = (gist.description !== null && gist.description.length > 30) ? `${gist.description.substring(0, 30)}...` : gist.description;

                        return (
                            <TR key={gist.id} >
                                <TD>
                                    <Image source={gist.owner.avatar_url} profile={"false"} altText={gist.owner.login} />
                                </TD>
                                <TD>
                                    <Text text={gist.owner.login} fontWeight="normal" color={Colors.SECONDARY.color} handleClick={() => handleGistView(gist.id)} />
                                </TD>
                                <TD>{new Date(gist.updated_at).toLocaleDateString()}</TD>
                                <TD>{new Date(gist.updated_at).toLocaleTimeString()}</TD>
                                <TD>{desc}</TD>
                                <TD>{fileName}</TD>
                                <TD>
                                    {
                                        <React.Fragment>
                                            <Icon simple={true} icon="fa fa-star-o" fontSize={13} title="Star" handleClick={() => handleGistStar(gist.id)} />

                                            {
                                                (gist.owner.login === username) ?
                                                    (
                                                        <React.Fragment>
                                                            <Icon simple={true} icon="fa fa-edit" fontSize={13} title="Edit" handleClick={() => handleGistEdit(gist.id)} />
                                                            <Icon simple={true} icon="fa fa-trash" fontSize={13} title="Delete" handleClick={() => handleGistDelete(gist.id)} />
                                                        </React.Fragment>
                                                    ) :
                                                    (
                                                        <React.Fragment>
                                                            {/* <Icon icon="fa fa-star" fontSize={10} title="Star" /> */}
                                                            <Icon simple={true} icon="fa fa-code-fork" fontSize={13} title="Fork" handleClick={() => handleGistFork(gist.id)} />
                                                        </React.Fragment>
                                                    )
                                            }
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