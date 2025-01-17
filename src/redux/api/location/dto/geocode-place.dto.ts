import { GeocodeResponseDto } from './geocode.dto';

export interface GeocodePlaceIdQueryDto {
	place_id: string;
}

export interface GeocodePlaceIdResponseDto extends GeocodeResponseDto {}
