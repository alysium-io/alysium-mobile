import { NanoId } from '@types';
import { ProfileImage } from '../profile-image.entity';

export interface CreateArtistProfileImageQueryDto {
	artist_uid: NanoId;
}

export interface CreateArtistProfileImageResponseDto extends ProfileImage {}
