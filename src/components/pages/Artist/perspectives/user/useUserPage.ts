import { artistApiSlice } from '@flux/api/artist';
import { PublicFindOneArtistResponseDto } from '@flux/api/artist/dto/artist-find-one.dto';
import { ApiIdentifier } from '@types';

interface IUseUserPage {
	artistData?: PublicFindOneArtistResponseDto;
	artistIsLoading: boolean;
	artistError: any;
}

const useUserPage = (artist_uid: ApiIdentifier): IUseUserPage => {
	const {
		data: artistData,
		isLoading: artistIsLoading,
		error: artistError
	} = artistApiSlice.usePublicFindOneQuery({
		params: { artist_uid: artist_uid }
	});

	return {
		artistData,
		artistIsLoading,
		artistError
	};
};

export default useUserPage;
