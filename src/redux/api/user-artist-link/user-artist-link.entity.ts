import { PublicArtist } from '../artist/artist.entity';
import { PrivateUser } from '../user/user.entity';
import { UserArtistLinkPermissions } from './types';

export interface UserArtistLink {
	readonly permissions: UserArtistLinkPermissions;
	readonly user: PrivateUser;
	readonly artist: PublicArtist;
}
