import { ApiIdentifier } from '@types';
import { HostEventLink } from '../host-event-link.entity';

export interface CreateHostEventLinkBodyDto {
	event_uid: ApiIdentifier;
	host_uid: ApiIdentifier;
}

export interface CreateHostEventLinkResponseDto extends HostEventLink {}
