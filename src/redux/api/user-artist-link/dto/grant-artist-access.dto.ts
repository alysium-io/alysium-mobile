import { NanoId } from '@types';
import { UserArtistLinkPermissions } from '../types';
import { UserArtistLink } from '../user-artist-link.entity';

export interface GrantArtistAccessBodyDto {
	readonly user_uid: NanoId;
	readonly artist_uid: NanoId;
	readonly permissions: UserArtistLinkPermissions;
}

export interface GrantArtistAccessResponseDto extends UserArtistLink {}
