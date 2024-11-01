import { artistApiSlice } from '@flux/api/artist';
import { PublicFindOneArtistResponseDto } from '@flux/api/artist/dto/artist-find-one.dto';
import { ApiIdentifier } from '@types';

interface IUseUserArtistPage {
	artistData?: PublicFindOneArtistResponseDto;
	artistIsLoading: boolean;
	artistError: any;
}

const useUserArtistPage = (artist_uid: ApiIdentifier): IUseUserArtistPage => {
	const {
		data: artistData,
		isLoading: artistIsLoading,
		error: artistError
	} = artistApiSlice.usePublicFindOneArtistQuery({
		params: { artist_uid: artist_uid }
	});

	return {
		artistData,
		artistIsLoading,
		artistError
	};
};

export default useUserArtistPage;
