import { useArtistAppContext } from '@arch/Application/contexts/Artist.context';
import { Section, View } from '@atomic';
import { UpdateArtistBodyDto } from '@flux/api/artist/dto/artist-update.dto';
import { profileImageApiSlice } from '@flux/api/profile-image';
import { useNavigation } from '@hooks';
import { EditableProfileImage, MenuListItem, TitleTextInput } from '@molecules';
import React, { useState } from 'react';
import { Control, Controller } from 'react-hook-form';
import { Asset } from 'react-native-image-picker';
import Separator from './Separator';

interface HeaderSectionProps {
	control: Control<UpdateArtistBodyDto, any>;
	onBlurEditable: () => void;
}

const HeaderSection: React.FC<HeaderSectionProps> = ({
	control,
	onBlurEditable
}) => {
	const { artistData, artistIsLoading } = useArtistAppContext();
	const { chooseScenePage } = useNavigation();
	const [isProfileImageLoading, setIsProfileImageLoading] = useState(false);
	const [createArtistProfileImageMutation] =
		profileImageApiSlice.useCreateArtistProfileImageMutation();

	const updateArtistProfileImage = async (profileImage: Asset) => {
		try {
			setIsProfileImageLoading(true);
			await createArtistProfileImageMutation({
				file: profileImage,
				query: { artist_uid: artistData.artist_uid }
			});
		} finally {
			setIsProfileImageLoading(false);
		}
	};

	return (
		<Section>
			<View margin='m' marginBottom='none'>
				<View alignItems='center' marginVertical='xl'>
					<EditableProfileImage
						size='large'
						onChooseImage={updateArtistProfileImage}
						image={artistData.profile_image?.medium.key}
						isLoading={artistIsLoading || isProfileImageLoading}
					/>
				</View>
				<Controller
					name='name'
					control={control}
					rules={{ required: true }}
					render={({ field: { onChange, value } }) => (
						<TitleTextInput
							placeholder='Artist name'
							onChangeText={onChange}
							onBlur={onBlurEditable}
							value={value}
						/>
					)}
				/>
			</View>
			<MenuListItem
				titleTextProps={{
					title: artistData.scene?.scene.name ?? 'City',
					bottomSubtext: artistData.scene?.scene.country ?? 'Join a scene',
					titleVariant: 'paragraph-medium'
				}}
				onPress={chooseScenePage}
				containerProps={{ border: false }}
			/>
			<Separator size='thick' marginTop='l' />
		</Section>
	);
};

export default HeaderSection;
