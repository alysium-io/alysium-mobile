import { ApiIdentifier } from '@types';
import { Artist } from '../artist/artist.entity';

export interface Location {
	location_uid: ApiIdentifier;
	country_code: string;
	artists: Artist[];
}
