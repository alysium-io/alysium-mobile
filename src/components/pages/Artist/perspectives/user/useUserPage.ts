import { artistApiSlice } from '@flux/api/artist';
import { FindOneArtistResponseDto } from '@flux/api/artist/dto/artist-find-one.dto';
import { SheetApi, useSheet } from '@hooks';
import { ApiIdentifier } from '@types';

interface IUseUserPage {
	artistData?: FindOneArtistResponseDto;
	artistIsLoading: boolean;
	artistError: any;
	moreSheetApi: SheetApi;
	linksSheetApi: SheetApi;
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

	const moreSheetApi = useSheet();
	const linksSheetApi = useSheet();

	const onPressFollowers = () => console.log('Followers');
	const onPressShows = () => console.log('Shows');
	const openLinks = () => console.log('Links');

	return {
		artistData,
		artistIsLoading,
		artistError,
		moreSheetApi,
		linksSheetApi,
		onPressFollowers,
		onPressShows,
		openLinks
	};
};

export default useUserPage;
