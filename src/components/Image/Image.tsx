import React from 'react';
import { ImageDiv } from './Style';

interface ImageProps {
    source: string;
    altText: string;
    profile: "true" | "false";
    size?: number;
}

const Image: React.FC<ImageProps> = ({ source, altText, profile, size }) => {
    return (
        <ImageDiv src={source} profile={profile} alt={altText} size={size} />
    );
}

export default Image;