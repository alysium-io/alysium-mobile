import { ApiIdentifier } from '@types';
import { Artist } from '../artist/artist.entity';

export interface Location {
	location_id: ApiIdentifier;
	country_code: string;
	artists: Artist[];
}
