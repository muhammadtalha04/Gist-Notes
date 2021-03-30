import styled from 'styled-components';

interface TextProps {
    fontWeight: string;
    color: string;
    // fontSize: number;
}

export const TextElement = styled.p<TextProps>`
    color: ${props => props.color};
    font-weight: ${props => props.fontWeight};
`;