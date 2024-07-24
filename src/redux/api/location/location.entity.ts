import { ApiIdentifier } from '@types';
import { PublicArtist } from '../artist/artist.entity';

export interface Location {
	readonly location_uid: ApiIdentifier;
	readonly country_code: string;
	readonly artists: PublicArtist[];
}
