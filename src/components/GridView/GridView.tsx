import React, { useMemo } from 'react';
import { generateCardsGrid } from '../../utils';
import { Gist } from '../../utils/types';
import Card from '../Card/Card';
import { Div } from './Style';

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
        const cards: JSX.Element[] = generateCardsGrid(gists, handleGistDelete, handleGistEdit, handleGistFork, handleGistStar, handleGistView);

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