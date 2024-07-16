import { artistApiSlice } from '@flux/api/artist';
import { FindOneArtistResponseDto } from '@flux/api/artist/dto/artist-find-one.dto';
import { ApiIdentifier } from '@types';

interface IUseUserPage {
	artistData?: FindOneArtistResponseDto;
	artistIsLoading: boolean;
	artistError: any;
	onPressFollowers: () => void;
	onPressShows: () => void;
	openLinks: () => void;
}

const useUserPage = (artist_uid: ApiIdentifier): IUseUserPage => {
	const {
		data: artistData,
		isLoading: artistIsLoading,
		error: artistError
	} = artistApiSlice.useFindOneQuery({
		params: { artist_uid: artist_uid }
	});

	const onPressFollowers = () => console.log('Followers');
	const onPressShows = () => console.log('Shows');
	const openLinks = () => console.log('Links');

	return {
		artistData,
		artistIsLoading,
		artistError,
		onPressFollowers,
		onPressShows,
		openLinks
	};
};

export default useUserPage;
