import { ApiIdentifier } from '@types';
import { Artist } from '../artist/artist.entity';
import { UserGallery } from '../gallery/gallery.entity';
import { Host } from '../host/host.entity';
import { Media } from '../media/media.entity';

export interface User {
	user_uid: ApiIdentifier;
	name: string | null;
	handle: string;
	email: string | null;
	phone_number: string | null;
	profile_image: Media | null;
	hosts: Host[];
	artists: Artist[];
	gallery: UserGallery[];
}
