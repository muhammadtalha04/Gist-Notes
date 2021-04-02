import styled from 'styled-components';

interface ImageDivProps {
    profile: "true" | "false";
    size?: number;
}

export const ImageDiv = styled.img<ImageDivProps>`
    border-radius: 50%;
    width: ${props => props.profile === "true" ? 250 : 35}px;
    height: ${props => props.profile === "true" ? 250 : 35}px;
    ${props => (props.size !== undefined) && `width: ${props.size}px; height: ${props.size}px;`}
`;