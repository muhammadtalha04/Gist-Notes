import styled from 'styled-components';

interface CardProps {
    singleGist: boolean;
    border?: boolean;
}

export const Div = styled.div``;

export const GistDetails = styled.div``;

export const UserWrapper = styled.div`
    display: flex;
    margin: 15px;
    margin-left: 3px;
`;

export const ImageWrapper = styled.span`
    margin-right: 10px;
`;

export const ContentWrapper = styled.div`
    border-radius: 5px;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);
`;

export const PRE = styled.pre<CardProps>`
    // white-space: pre-wrap;
    ${props => props.singleGist === false && `overflow: hidden;`}

    &::before {
        counter-reset: listing;
    }
`;

export const CODE = styled.code`
    display: block;
    counter-increment: listing;
    
    &::before {
        content: counter(listing) " ";
        border-right: 1px solid rgba(0, 0, 0, 0.4);
        display: inline-block;
        width: 40px;        
        padding-left: auto; 
        margin-left: auto;
        text-align: right;
        margin-right: 10px;
    }
`;

export const FileNameWrapper = styled.div`
    display: grid;
    grid-template-columns: 30px auto;
    padding: 5px 20px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.4);
`;

export const Span = styled.span`
    align-self: center;
`;

export const FileContentWrapper = styled.div<CardProps>`
    padding: 20px ${props => props.singleGist ? "40px" : "15px 10px 15px"};
`;

export const UserDetailsWrapper = styled.div`
    border-top: 1px solid rgba(0, 0, 0, 0.4);
`;