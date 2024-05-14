import { Avatar } from '@atomic';
import { ContentType } from '@types';
import React from 'react';
import ImageContainer from './ImageContainer';

interface ArtistImageProps {
	image: string;
}

const ArtistImage: React.FC<ArtistImageProps> = ({ image }) => {
	return (
		<ImageContainer>
			<Avatar contentType={ContentType.artist} image={image} size='90%' />
		</ImageContainer>
	);
};

export default ArtistImage;
