import { NanoId } from '@types';
import { UserArtistLink } from '../user-artist-link.entity';

export interface RevokeArtistAccessBodyDto {
	readonly user_uid: NanoId;
	readonly artist_uid: NanoId;
}

export interface RevokeArtistAccessResponseDto extends UserArtistLink {}
