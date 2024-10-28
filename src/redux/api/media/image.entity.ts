import { Media } from './media.entity';

export interface Image {
	readonly small: Media;
	readonly medium: Media;
	readonly large: Media;
}
