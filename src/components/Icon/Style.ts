import styled from 'styled-components';
import { Colors } from '../../utils/colors';

interface IconProps {
    fontSize: number;
}

export const IconButton = styled.button<IconProps>`
    background: ${Colors.PRIMARY.background};
    color: ${Colors.PRIMARY.color};
    margin: 0px 5px;
    font-size: ${props => props.fontSize}pt;

    &:hover {
        color: ${Colors.PRIMARY.hover}
    }
`;