import React from 'react';
import Icon from '../Icon/Icon';
import { Div } from './Style';

interface PaginationProps {
    pageNum: number;
    lastPage: number;
    onClickPrevPage: React.MouseEventHandler<HTMLButtonElement>;
    onClickNextPage: React.MouseEventHandler<HTMLButtonElement>;
}

const Pagination: React.FC<PaginationProps> = ({ pageNum, lastPage, onClickPrevPage, onClickNextPage }) => {
    return (
        <Div className="text-center mt-2">
            <Icon simple={false} icon="fa fa-arrow-left" fontSize={9} title="Previous Page" handleClick={onClickPrevPage} />
            {
                pageNum + " of " + ((lastPage > 0) ? lastPage : "1")
            }
            <Icon simple={false} icon="fa fa-arrow-right" fontSize={9} title="Next Page" handleClick={onClickNextPage} />
        </Div>
    );
}

export default Pagination;