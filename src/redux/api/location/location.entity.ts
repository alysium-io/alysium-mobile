import { ApiIdentifier } from '@types';
import { Artist } from '../artist/artist.entity';

export interface Location {
	readonly location_uid: ApiIdentifier;
	readonly country_code: string;
	readonly artists: Artist[];
}
