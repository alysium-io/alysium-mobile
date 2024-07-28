import { userArtistsFollowingApiSlice } from '@flux/api/user-artists-following';
import { FindAllUserArtistsFollowingResponseDto } from '@flux/api/user-artists-following/dto/user-artists-following-find-all.dto';
import { usePagination } from '@hooks';

interface IUseUserArtistsFollowingPage {
	userArtistsFollowingData?: FindAllUserArtistsFollowingResponseDto[];
	userArtistsFollowingLoading: boolean;
	userArtistsFollowingError: any;
	nextPage: () => void;
}

const useUserArtistsFollowingPage = (): IUseUserArtistsFollowingPage => {
	const { page, nextPage, defaultLimit } = usePagination();

	const {
		data: userArtistsFollowingData,
		isLoading: userArtistsFollowingLoading,
		isError: userArtistsFollowingError
	} = userArtistsFollowingApiSlice.useFindAllQuery({
		query: {
			page,
			limit: defaultLimit
		}
	});

	return {
		userArtistsFollowingData,
		userArtistsFollowingLoading,
		userArtistsFollowingError,
		nextPage
	};
};

export default useUserArtistsFollowingPage;
