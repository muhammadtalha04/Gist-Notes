import styled from 'styled-components';
import { Colors } from '../../constants/colors';

export const TableElement = styled.table`
    text-align: center;
    border-radius: 10px;
    width: 100%;
`;

export const THead = styled.thead`
    background: ${Colors.PRIMARY.background};
    color: ${Colors.PRIMARY.color};
`;

export const TBody = styled.tbody`
    border-left: 2px solid #dee2e6;
`;

export const TH = styled.th``;

export const TD = styled.td``;

export const TR = styled.tr`
    align-items: center;
`;

export const Div = styled.div``;