import { userTagsFollowingApiSlice } from '@flux/api/user-tags-following';
import { FindAllUserTagsFollowingResponseDto } from '@flux/api/user-tags-following/dto/user-tags-following-find-all.dto';

interface IUseUserTagsFollowingPage {
	userTagsFollowingData?: FindAllUserTagsFollowingResponseDto[];
	userTagsFollowingLoading: boolean;
	userTagsFollowingError: boolean;
}

const useUserTagsFollowingPage = (): IUseUserTagsFollowingPage => {
	const {
		data: userTagsFollowingData,
		isLoading: userTagsFollowingLoading,
		isError: userTagsFollowingError
	} = userTagsFollowingApiSlice.useFindAllQuery({
		query: {
			page: 1,
			limit: 50
		}
	});

	return {
		userTagsFollowingData,
		userTagsFollowingLoading,
		userTagsFollowingError
	};
};

export default useUserTagsFollowingPage;
