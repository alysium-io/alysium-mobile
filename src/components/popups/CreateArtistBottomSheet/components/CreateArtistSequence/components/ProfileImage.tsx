import { Text, View } from '@atomic';
import { EditableProfileImage } from '@molecules';
import React from 'react';
import { Asset } from 'react-native-image-picker';

interface ProfileImageProps {
	profileImage: Asset | null;
	setProfileImage: (profileImage: Asset | null) => void;
}

const ProfileImage: React.FC<ProfileImageProps> = ({
	profileImage,
	setProfileImage
}) => {
	return (
		<View margin='m' marginTop='xxl' alignItems='center'>
			<EditableProfileImage
				image={profileImage?.uri}
				defaultImageProps={{
					icon: 'artist'
				}}
				onChooseImage={setProfileImage}
			/>
			<Text textAlign='center' variant='paragraph-small-light' marginTop='xl'>
				Choosing a good profile picture will greatly increase your chances of
				getting <Text variant='paragraph-small'>noticed</Text>.
			</Text>
		</View>
	);
};

export default ProfileImage;
