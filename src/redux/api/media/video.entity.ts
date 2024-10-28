import { Image } from './image.entity';
import { Media } from './media.entity';

export interface Video {
	readonly media: Media;
	readonly thumbnail: Image | null;
}
