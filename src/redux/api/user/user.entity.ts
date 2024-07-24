import { ApiIdentifier } from '@types';
import { PrivateArtist } from '../artist/artist.entity';
import { UserGallery } from '../gallery/gallery.entity';
import { Host } from '../host/host.entity';
import { Media } from '../media/media.entity';

export interface User {
	readonly user_uid: ApiIdentifier;
	readonly name: string | null;
	readonly handle: string;
	readonly email: string | null;
	readonly phone_number: string | null;
	readonly profile_image: Media | null;
	readonly hosts: Host[];
	readonly artists: PrivateArtist[];
	readonly gallery: UserGallery[];
}
