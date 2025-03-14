import { Image } from './image.entity';
import { MediaType } from './types';
import { Video } from './video.entity';

export interface Multimedia {
	readonly media_type: MediaType;
	readonly timestamp: string | null;
	readonly image: Image | null;
	readonly video: Video | null;
}
