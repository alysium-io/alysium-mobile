import { artistApiSlice } from '@flux/api/artist';
import { PublicFindOneArtistResponseDto } from '@flux/api/artist/dto/artist-find-one.dto';
import { galleryApiSlice } from '@flux/api/gallery';
import { FindGalleryResponseDto } from '@flux/api/gallery/dto/gallery-find.dto';
import { MediaRefType } from '@flux/api/media/types';
import { ApiIdentifier } from '@types';

interface IUseUserArtistPage {
	artistData?: PublicFindOneArtistResponseDto;
	artistIsLoading: boolean;
	artistError: any;
	galleryData?: FindGalleryResponseDto;
}

const useUserArtistPage = (artist_uid: ApiIdentifier): IUseUserArtistPage => {
	const {
		data: artistData,
		isLoading: artistIsLoading,
		error: artistError
	} = artistApiSlice.usePublicFindOneArtistQuery({
		params: { artist_uid: artist_uid }
	});

	const { data: galleryData } = galleryApiSlice.useFindGalleryQuery({
		params: {
			refId: artist_uid,
			refType: MediaRefType.artist
		}
	});

	return {
		artistData,
		artistIsLoading,
		artistError,
		galleryData
	};
};

export default useUserArtistPage;
