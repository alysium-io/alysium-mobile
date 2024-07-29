import { ApiIdentifier } from '@types';
import { UserArtistsFollowing } from '../user-artists-following.entity';

export interface DeleteUserArtistsFollowingParamsDto {
	artist_uid: ApiIdentifier;
}

export interface DeleteUserArtistsFollowingResponseDto
	extends UserArtistsFollowing {}
