import { userArtistsFollowingApiSlice } from '@flux/api/user-artists-following';
import { FindAllUserArtistsFollowingResponseDto } from '@flux/api/user-artists-following/dto/user-artists-following-find-all.dto';

interface IUseUserArtistsFollowingPage {
	userArtistsFollowingData?: FindAllUserArtistsFollowingResponseDto[];
	userArtistsFollowingLoading: boolean;
	userArtistsFollowingError: boolean;
}

const useUserArtistsFollowingPage = (): IUseUserArtistsFollowingPage => {
	const {
		data: userArtistsFollowingData,
		isLoading: userArtistsFollowingLoading,
		isError: userArtistsFollowingError
	} = userArtistsFollowingApiSlice.useFindAllQuery({
		query: {
			page: 1,
			limit: 50
		}
	});

	return {
		userArtistsFollowingData,
		userArtistsFollowingLoading,
		userArtistsFollowingError
	};
};

export default useUserArtistsFollowingPage;
