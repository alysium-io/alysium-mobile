import { NanoId } from '@types';
import { PrivateArtist } from '../artist/artist.entity';
import { UserGallery } from '../gallery/gallery.entity';
import { Host } from '../host/host.entity';
import { ProfileImage } from '../profile-image';

export enum Role {
	guest = 'guest',
	user = 'user',
	admin = 'admin'
}

export interface PrivateUser {
	readonly user_uid: NanoId;
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
	readonly role: Role;
}
