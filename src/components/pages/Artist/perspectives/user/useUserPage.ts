import { artistApiSlice } from '@flux/api/artist';
import { PublicFindOneArtistResponseDto } from '@flux/api/artist/dto/artist-find-one.dto';
import { userArtistsFollowingApiSlice } from '@flux/api/user-artists-following';
import {
	BehaviorAction,
	useBehaviorContext
} from '@src/utils/contexts/Behavior';
import { ApiIdentifier } from '@types';

interface IUseUserPage {
	artistData?: PublicFindOneArtistResponseDto;
	artistIsLoading: boolean;
	artistError: any;
	onPressFollowButton: (isFollowing: boolean) => void;
}

const useUserPage = (artist_uid: ApiIdentifier): IUseUserPage => {
	const { behavior } = useBehaviorContext();
	const {
		data: artistData,
		isLoading: artistIsLoading,
		error: artistError
	} = artistApiSlice.usePublicFindOneQuery({
		params: { artist_uid: artist_uid }
	});

	const [userArtistsFollowCreateMutation] =
		userArtistsFollowingApiSlice.useCreateMutation();
	const [userArtistsFollowDeleteMutation] =
		userArtistsFollowingApiSlice.useDeleteMutation();

	const onPressFollowButton = (isFollowing: boolean) => {
		if (artistData) {
			if (isFollowing) {
				userArtistsFollowCreateMutation({
					body: {
						artist_uid: artistData.artist_uid
					}
				});
				behavior(BehaviorAction.FOLLOW_ARTIST, {
					artist_uid: artistData.artist_uid
				});
			} else {
				userArtistsFollowDeleteMutation({
					params: {
						artist_uid: artistData.artist_uid
					}
				});
				behavior(BehaviorAction.UNFOLLOW_ARTIST, {
					artist_uid: artistData.artist_uid
				});
			}
		}
	};

	return {
		artistData,
		artistIsLoading,
		artistError,
		onPressFollowButton
	};
};

export default useUserPage;
