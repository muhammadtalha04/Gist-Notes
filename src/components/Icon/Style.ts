import styled from 'styled-components';
import { Colors } from '../../constants/colors';

interface IconProps {
    fontSize: number;
    color?: string;
    border?: boolean;
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

export const I = styled.i``;

export const Span = styled.span<IconProps>`
    padding: 5px;
    font-size: ${props => props.fontSize}pt;
    ${props => props.color !== undefined && `color: ${props.color};`}
    cursor: pointer;
    ${props => (props.border !== undefined && props.border === true && `border-right: 1px solid ${Colors.SECONDARY.color};`)}
`;