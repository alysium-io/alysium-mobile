import { userTagsFollowingApiSlice } from '@flux/api/user-tags-following';
import { FindAllUserTagsFollowingResponseDto } from '@flux/api/user-tags-following/dto/user-tags-following-find-all.dto';
import { usePagination } from '@hooks';

interface IUseUserTagsFollowingPage {
	userTagsFollowingData?: FindAllUserTagsFollowingResponseDto[];
	userTagsFollowingLoading: boolean;
	userTagsFollowingError: boolean;
	nextPage: () => void;
}

const useUserTagsFollowingPage = (): IUseUserTagsFollowingPage => {
	const { page, nextPage, defaultLimit } = usePagination();

	const {
		data: userTagsFollowingData,
		isLoading: userTagsFollowingLoading,
		isError: userTagsFollowingError
	} = userTagsFollowingApiSlice.useFindAllQuery({
		query: {
			page,
			limit: defaultLimit
		}
	});

	return {
		userTagsFollowingData,
		userTagsFollowingLoading,
		userTagsFollowingError,
		nextPage
	};
};

export default useUserTagsFollowingPage;
