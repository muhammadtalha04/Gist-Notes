import React, { useEffect, useState } from 'react';
import { Colors } from '../../constants/colors';
import { useUserContext } from '../../context/UserContext';
import { getGistContent } from '../../utils';
import { Gist } from '../../utils/types';
import Icon from '../Icon/Icon';
import Text from '../Text/Text';
import { CODE, ContentWrapper, FileContentWrapper, FileNameWrapper, GistDetails, PRE, Span, UserDetailsWrapper } from './Style';
import UserDetails from './UserDetails';

interface CardProps {
    gist: Gist;
    singleGist: boolean;
    handleGistEdit: (id: string) => void;
    handleGistDelete: (id: string) => void;
    handleGistStar: (id: string) => void;
    handleGistFork: (id: string) => void;
}

const Card: React.FC<CardProps> = ({ gist, singleGist, handleGistEdit, handleGistDelete, handleGistStar, handleGistFork }) => {
    const [fileName, setFileName] = useState("");
    const [content, setContent] = useState([]);
    const { state } = useUserContext();

    useEffect(() => {
        const fName = Object.keys(gist.files)[0];
        const files: any = gist.files;

        setFileName(fName);

        if (files[fName] !== undefined && content.length === 0) {
            getGistContent(files[fName].raw_url).then(x => {
                return x.text()
            }).then((data) => {
                setContent(data.split("\n"));
            });
        }
    }, [gist, content, setFileName, setContent]);

    return (
        <React.Fragment>

            {
                singleGist &&
                (
                    <GistDetails className="row">
                        <Span className="col-sm-6">
                            <UserDetails
                                avatar_url={gist.owner.avatar_url}
                                username={gist.owner.login}
                                fileName={fileName}
                                date={gist.updated_at}
                            />
                        </Span>
                        <Span className="col-sm-6 text-right">
                            <Icon icon="fa fa-star-o" simple={true} fontSize={11} title="" text="Star" color={Colors.MISC.blue} handleClick={() => handleGistStar(gist.id)} />
                            {
                                (gist.owner.login !== state.login) ?
                                    (
                                        <Icon icon="fa fa-code-fork" simple={true} fontSize={11} title="" text="Fork" color={Colors.MISC.blue} handleClick={() => handleGistFork(gist.id)} />
                                    ) :
                                    (
                                        <React.Fragment>
                                            <Icon simple={true} icon="fa fa-edit" fontSize={11} title="" text="Edit" color={Colors.MISC.blue} handleClick={() => handleGistEdit(gist.id)} />
                                            <Icon simple={true} icon="fa fa-trash" fontSize={11} title="" text="Delete" color={Colors.MISC.blue} handleClick={() => handleGistDelete(gist.id)} />
                                        </React.Fragment>
                                    )
                            }
                        </Span>
                    </GistDetails>
                )
            }

            <ContentWrapper>
                {
                    singleGist &&
                    (
                        <FileNameWrapper>
                            <Icon icon="fa fa-code" simple={true} fontSize={13} title=""></Icon>
                            <Span>
                                <Text text={fileName} fontWeight="normal" color={Colors.MISC.blue} fontSize={"11"} />
                            </Span>
                        </FileNameWrapper>
                    )
                }

                <FileContentWrapper singleGist={singleGist}>
                    <PRE singleGist={singleGist}>
                        {
                            (!singleGist) ?
                                content.slice(0, 13).map((cont, index) => {
                                    return (<CODE key={index}>{cont}</CODE>)
                                }) :

                                content.map((cont, index) => {
                                    return (<CODE key={index}>{cont}</CODE>)
                                })
                        }
                    </PRE>

                    {
                        !singleGist &&
                        (
                            <UserDetailsWrapper>
                                <UserDetails
                                    avatar_url={gist.owner.avatar_url}
                                    username={gist.owner.login}
                                    fileName={fileName}
                                    date={gist.updated_at}
                                />
                            </UserDetailsWrapper>
                        )
                    }
                </FileContentWrapper>
            </ContentWrapper>
        </React.Fragment>
    );
}

export default Card;