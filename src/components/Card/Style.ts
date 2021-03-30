import styled from 'styled-components';
import { Colors } from '../../utils/colors';

export const OuterDiv = styled.div`
    // background: ${Colors.PRIMARY.background};
    border-radius: 5px;
    padding: 0px;
    border: 1px solid ${Colors.PRIMARY.background};
`;

export const Div = styled.div``;

export const DivHeader = styled.div`
    background: ${Colors.PRIMARY.background};
    color: ${Colors.PRIMARY.color};
    border-radius: 3px 3px 0px 0px;
    padding: 10px;
    font-weight: 600;
`;

export const DivBody = styled.div`
    padding: 15px;
`;