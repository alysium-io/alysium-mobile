import { ApiIdentifier } from '@types';
import { PrivateArtist } from '../artist/artist.entity';
import { UserGallery } from '../gallery/gallery.entity';
import { Host } from '../host/host.entity';
import { ProfileImage } from '../profile-image';

export interface PrivateUser {
	readonly user_uid: ApiIdentifier;
	readonly name: string | null;
	readonly handle: string;
	readonly email: string | null;
	readonly phone_number: string | null;
	readonly profile_image: ProfileImage | null;
	readonly hosts: Host[];
	readonly artists: PrivateArtist[];
	readonly gallery: UserGallery[];
	readonly num_tags_following: number;
	readonly num_artists_following: number;
}
