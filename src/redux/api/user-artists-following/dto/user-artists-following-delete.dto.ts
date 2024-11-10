import { NanoId } from '@types';
import { UserArtistsFollowing } from '../user-artists-following.entity';

export interface DeleteUserArtistsFollowingParamsDto {
	artist_uid: NanoId;
}

export interface DeleteUserArtistsFollowingResponseDto
	extends UserArtistsFollowing {}
