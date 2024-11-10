import { NanoId } from '@types';
import { UserArtistsFollowing } from '../user-artists-following.entity';

export interface CreateUserArtistsFollowingBodyDto {
	artist_uid: NanoId;
}

export interface CreateUserArtistsFollowingResponseDto
	extends UserArtistsFollowing {}
