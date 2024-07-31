import { PrivateArtist } from '../artist/artist.entity';
import { Tag } from '../tag';

export interface ArtistTagLink {
	readonly artist: PrivateArtist;
	readonly tag: Tag;
}
