import { tagApiSlice } from '@flux/api/tag';
import { FindTagArtistsResponseDto } from '@flux/api/tag/dto/tag-artists.dto';
import { FindTagCorrelatedResponseDto } from '@flux/api/tag/dto/tag-correlated.dto';
import { FindOneTagResponseDto } from '@flux/api/tag/dto/tag-find-one.dto';
import { userTagsFollowingApiSlice } from '@flux/api/user-tags-following';
import { usePagination } from '@hooks';
import { ApiIdentifier } from '@types';

interface IUseTagPage {
	tagData?: FindOneTagResponseDto;
	isTagLoading: boolean;
	isTagError: any;
	tagArtists?: FindTagArtistsResponseDto[];
	isTagArtistsLoading: boolean;
	isTagArtistsError: any;
	correlatedTagsData?: FindTagCorrelatedResponseDto;
	isCorrelatedTagsLoading: boolean;
	isCorrelatedTagsError: any;
	nextPage: () => void;
	onPressFollowButton: (isFollowing: boolean) => void;
}

const useTagPage = (tag_uid: ApiIdentifier): IUseTagPage => {
	const { page, nextPage, defaultLimit } = usePagination();

	const {
		data: tagArtists,
		isLoading: isTagArtistsLoading,
		isError: isTagArtistsError
	} = tagApiSlice.useFindTagArtistsQuery({
		params: { tag_uid },
		query: { page, limit: defaultLimit }
	});

	const {
		data: tagData,
		isLoading: isTagLoading,
		isError: isTagError
	} = tagApiSlice.useFindOneQuery({ params: { tag_uid } });

	const {
		data: correlatedTagsData,
		isLoading: isCorrelatedTagsLoading,
		isError: isCorrelatedTagsError
	} = tagApiSlice.useFindTagCorrelatedQuery({ params: { tag_uid } });

	const [userTagsFollowCreateMutation] =
		userTagsFollowingApiSlice.useCreateMutation();
	const [userTagsFollowDeleteMutation] =
		userTagsFollowingApiSlice.useDeleteMutation();

	const onPressFollowButton = (isFollowing: boolean) => {
		if (tagData) {
			if (isFollowing) {
				userTagsFollowCreateMutation({
					body: {
						tag_uid: tagData.tag_uid
					}
				});
			} else {
				userTagsFollowDeleteMutation({
					params: {
						tag_uid: tagData.tag_uid
					}
				});
			}
		}
	};

	return {
		tagData,
		isTagLoading,
		isTagError,
		tagArtists,
		correlatedTagsData,
		isCorrelatedTagsLoading,
		isCorrelatedTagsError,
		isTagArtistsLoading,
		isTagArtistsError,
		nextPage,
		onPressFollowButton
	};
};

export default useTagPage;
