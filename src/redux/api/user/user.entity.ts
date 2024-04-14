import { ApiIdentifier } from '@types';
import { Artist } from '../artist/artist.entity';
import { UserGallery } from '../gallery/gallery.entity';
import { Host } from '../host/host.entity';
import { Media } from '../media/media.entity';

export interface User {
	user_id: ApiIdentifier;
	name: string;
	email: string;
	profile_image: Media | null;
	hosts: Host[];
	artists: Artist[];
	gallery: UserGallery[];
}
