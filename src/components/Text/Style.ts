import styled from 'styled-components';

interface TextProps {
    fontWeight: string;
    color: string;
    fontSize?: string;
}

export const TextElement = styled.p<TextProps>`
    color: ${props => props.color};
    font-weight: ${props => props.fontWeight};
    ${props => (props.fontSize !== undefined && "font-size: " + props.fontSize + "pt")};
    cursor: pointer;
`;