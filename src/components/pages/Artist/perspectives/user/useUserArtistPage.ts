import { artistApiSlice } from '@flux/api/artist';
import { PublicFindOneArtistResponseDto } from '@flux/api/artist/dto/artist-find-one.dto';
import { artistEventApiSlice } from '@flux/api/event';
import { FindAllArtistEventsResponseDto } from '@flux/api/event/dto/artist-event-find-all.dto';
import { NanoId } from '@types';

interface IUseUserArtistPage {
	artistData?: PublicFindOneArtistResponseDto;
	artistIsLoading: boolean;
	artistError: any;
	eventsData?: FindAllArtistEventsResponseDto;
}

const useUserArtistPage = (artist_uid: NanoId): IUseUserArtistPage => {
	const {
		data: artistData,
		isLoading: artistIsLoading,
		error: artistError
	} = artistApiSlice.usePublicFindOneArtistQuery({
		params: { artist_uid: artist_uid }
	});

	const { data: eventsData } =
		artistEventApiSlice.usePublicFindAllArtistEventsQuery({
			params: { artist_uid },
			query: {
				page: 1,
				limit: 20
			}
		});

	return {
		artistData,
		artistIsLoading,
		artistError,
		eventsData
	};
};

export default useUserArtistPage;
