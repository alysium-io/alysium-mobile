import { EventLink } from '@flux/api/event-link/event-link.entity';

export interface NearbyEventsQueryDto {
	readonly latitude?: number;
	readonly longitude?: number;
	readonly radius?: number;
}

export interface NearbyEventsResponseDto extends Array<EventLink> {}
