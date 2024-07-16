import { Avatar, View } from '@atomic';
import React from 'react';

const sizeScheme = {
	small: 50,
	medium: 65,
	large: 95
};

interface ProfileImageProps extends React.ComponentProps<typeof Avatar> {
	size?: keyof typeof sizeScheme;
}

const ProfileImage: React.FC<ProfileImageProps> = ({
	size = 'medium',
	...props
}) => {
	return (
		<View style={{ height: sizeScheme[size], aspectRatio: 1 }}>
			<Avatar {...props} />
		</View>
	);
};

export default ProfileImage;
