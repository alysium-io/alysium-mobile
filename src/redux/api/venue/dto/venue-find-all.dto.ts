import { Venue } from '../venue.entity';

export interface FindAllVenuesQueryDto {
	page: number;
	limit: number;
}

export interface FindAllVenuesResponseDto extends Venue {}
