import { artistApiSlice } from '@flux/api/artist';
import { FindOneArtistResponseDto } from '@flux/api/artist/dto/artist-find-one.dto';
import { SheetApi, useSheet } from '@hooks';
import { ApiIdentifier } from '@types';

interface IUseHostPage {
	artistData?: FindOneArtistResponseDto;
	artistIsLoading: boolean;
	artistError: any;
	moreSheetApi: SheetApi;
	linksSheetApi: SheetApi;
	addArtistToEventCandidatesSheetApi: SheetApi;
	onPressFollowers: () => void;
	onPressShows: () => void;
	openLinks: () => void;
}

const useHostPage = (artist_uid: ApiIdentifier): IUseHostPage => {
	const {
		data: artistData,
		isLoading: artistIsLoading,
		error: artistError
	} = artistApiSlice.useFindOneQuery({
		params: { artist_uid: artist_uid }
	});

	const moreSheetApi = useSheet();
	const linksSheetApi = useSheet();
	const addArtistToEventCandidatesSheetApi = useSheet();

	const onPressFollowers = () => console.log('Followers');
	const onPressShows = () => console.log('Shows');
	const openLinks = () => console.log('Links');

	return {
		artistData,
		artistIsLoading,
		artistError,
		moreSheetApi,
		linksSheetApi,
		addArtistToEventCandidatesSheetApi,
		onPressFollowers,
		onPressShows,
		openLinks
	};
};

export default useHostPage;
