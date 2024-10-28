import { Multimedia } from '../media/multimedia.entity';

export interface GalleryItem {
	readonly multimedia: Multimedia;
	readonly order: number;
}
