import { GeocodeResponseDto } from './geocode.dto';

export interface GeocodeLatLngQueryDto {
	latitude: number;
	longitude: number;
}

export interface GeocodeLatLngResponseDto extends GeocodeResponseDto {}
