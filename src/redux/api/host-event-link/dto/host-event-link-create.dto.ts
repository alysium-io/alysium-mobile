import { ApiIdentifier } from '@types';
import { HostEventLink } from '../host-event-link.entity';

export interface CreateHostEventLinkBodyDto {
	event_id: ApiIdentifier;
	host_id: ApiIdentifier;
}

export interface CreateHostEventLinkResponseDto extends HostEventLink {}
