import { Avatar, View } from '@atomic';
import { Props } from '@types';
import React from 'react';

const sizeScheme = {
	small: 50,
	medium: 75,
	large: 95
};

interface ProfileImageProps extends Props<typeof Avatar> {
	containerProps?: Props<typeof View>;
	size?: keyof typeof sizeScheme;
}

const ProfileImage: React.FC<ProfileImageProps> = ({
	containerProps,
	size = 'medium',
	...props
}) => {
	return (
		<View
			style={{ height: sizeScheme[size], aspectRatio: 1 }}
			{...containerProps}
		>
			<Avatar {...props} />
		</View>
	);
};

export default ProfileImage;
