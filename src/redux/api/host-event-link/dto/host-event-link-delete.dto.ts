import { ApiIdentifier } from '@types';
import { HostEventLink } from '../host-event-link.entity';

export interface DeleteHostEventLinkBodyDto {
	host_id: ApiIdentifier;
	event_id: ApiIdentifier;
}

export interface DeleteHostEventLinkResponseDto extends HostEventLink {}
