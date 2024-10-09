import { View } from '@atomic';
import { CreateArtistTagLinkBodyDto } from '@flux/api/artist-tag-link/dto/artist-tag-link-create.dto';
import { ListApi, SequenceApi, TextInputApi } from '@hooks';
import { FullScreenSheetScrollView, Sequence } from '@organisms';
import { CreateArtistFormApi } from '@src/utils/redux-hook-form/useCreateArtistFormApi';
import React from 'react';
import { Asset } from 'react-native-image-picker';
import { FadeOut } from 'react-native-reanimated';
import ArtistName from './components/ArtistName';
import ProfileImage from './components/ProfileImage';
import SelectTags from './components/SelectTags';

interface CreateArtistSequenceProps {
	createArtistSequenceApi: SequenceApi;
	createArtistFormApi: CreateArtistFormApi;
	artistNameTextInputApi: TextInputApi;
	profileImage: Asset | null;
	setProfileImage: (profileImage: Asset | null) => void;
	selectedTagsListApi: ListApi<Omit<CreateArtistTagLinkBodyDto, 'artist_uid'>>;
}

const CreateArtistSequence: React.FC<CreateArtistSequenceProps> = ({
	createArtistSequenceApi,
	createArtistFormApi,
	artistNameTextInputApi,
	profileImage,
	setProfileImage,
	selectedTagsListApi
}) => {
	return (
		<View flex={1} animated exiting={FadeOut}>
			<Sequence sequenceIndex={createArtistSequenceApi.sequenceIndex}>
				<ArtistName
					createArtistFormApi={createArtistFormApi}
					artistNameTextInputApi={artistNameTextInputApi}
				/>
				<ProfileImage
					profileImage={profileImage}
					setProfileImage={setProfileImage}
				/>
				<FullScreenSheetScrollView>
					<SelectTags selectedTagsListApi={selectedTagsListApi} />
				</FullScreenSheetScrollView>
			</Sequence>
		</View>
	);
};

export default CreateArtistSequence;
