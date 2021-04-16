import React, { useMemo } from 'react';
import { Gist, IDFunc } from '../../types';
import Card from '../Card/Card';
import { Div } from './Style';

const generateCardsGrid = (gists: Gist[], handleGistView: IDFunc, handleGistEdit: IDFunc, handleGistDelete: IDFunc, handleGistStar: IDFunc, handleGistFork: IDFunc) => {
    return gists.map((gist) => {
        return (
            <Div className="col-sm-3 mb-5" key={gist.id} onClick={() => handleGistView(gist.id)}>
                <Card
                    gist={gist}
                    singleGist={false}
                    handleGistEdit={handleGistEdit}
                    handleGistDelete={handleGistDelete}
                    handleGistStar={handleGistStar}
                    handleGistFork={handleGistFork}
                />
            </Div>
        )
    });
}

interface GridViewProps {
    gists: Gist[];
    handleGistEdit: (id: string) => void;
    handleGistDelete: (id: string) => void;
    handleGistStar: (id: string) => void;
    handleGistFork: (id: string) => void;
    handleGistView: (id: string) => void;
}

const GridView: React.FC<GridViewProps> = ({ gists, handleGistEdit, handleGistDelete, handleGistFork, handleGistStar, handleGistView }) => {
    const render = useMemo(() => {
        const cards: JSX.Element[] = generateCardsGrid(gists, handleGistView, handleGistEdit, handleGistDelete, handleGistStar, handleGistFork);

        return cards;
    }, [gists, handleGistDelete, handleGistEdit, handleGistFork, handleGistStar, handleGistView])

    return (
        <Div className="row mt-3">
            {
                render
            }
        </Div>
    );
}

export default GridView;