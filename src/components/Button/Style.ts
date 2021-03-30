import styled from 'styled-components';
import { Colors } from '../../utils/colors';

export const StyledButton = styled.button`
    padding-top: 5px;
    padding-bottom: 5px;
    margin: 0px 5px;
    border: 1px solid ${Colors.PRIMARY.hover};
    background: transparent;
    color: ${Colors.PRIMARY.color};

    &:hover {
        color: ${Colors.PRIMARY.hover};
    }
`;

export const NormalButton = styled.button`
    padding-top: 5px;
    padding-bottom: 5px;
    margin: 0px 5px;
    border: 1px solid ${Colors.PRIMARY.background};
    background: ${Colors.PRIMARY.background};
    color: #fff;

    &:hover {
        color: #fff;
    }
`;