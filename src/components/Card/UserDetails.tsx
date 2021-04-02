import React from 'react';
import { Colors } from '../../constants/colors';
import Image from '../Image/Image';
import Text from '../Text/Text';
import { UserWrapper, ImageWrapper, Span } from './Style';

interface UserDetailsProps {
    avatar_url: string;
    username: string;
    fileName: string;
    date: string;
}

const UserDetails: React.FC<UserDetailsProps> = ({ avatar_url, username, fileName, date }) => {
    return (
        <UserWrapper>
            <ImageWrapper>
                <Image source={avatar_url} altText={username} profile={"false"} size={50} />
            </ImageWrapper>
            <Span>
                <Text text={`${username} / ${fileName}`} fontWeight="normal" color={Colors.MISC.blue} fontSize={"11"} />
                <Text text={`Created on ${new Date(date).toLocaleDateString()}`} fontWeight="normal" color={Colors.MISC.gray} fontSize={"9"} />
            </Span>
        </UserWrapper>
    );
}

export default UserDetails;