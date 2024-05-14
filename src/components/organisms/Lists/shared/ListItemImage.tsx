import { Avatar, View } from '@atomic';
import { ContentType, Persona } from '@types';
import React from 'react';

const sizeScheme = {
	small: 50,
	medium: 65,
	large: 95
};

interface ListItemImageProps {
	image?: string;
	contentType: ContentType | Persona;
	size?: keyof typeof sizeScheme;
	borderRadius?: 'round' | 'sharp' | 'smooth' | number;
}

const ListItemImage: React.FC<ListItemImageProps> = ({
	image,
	contentType,
	size = 'medium',
	borderRadius = 'round'
}) => {
	return (
		<View style={{ height: sizeScheme[size], aspectRatio: 1 }}>
			<Avatar
				contentType={contentType}
				borderRadius={borderRadius}
				image={image}
				size='100%'
			/>
		</View>
	);
};

export default ListItemImage;
