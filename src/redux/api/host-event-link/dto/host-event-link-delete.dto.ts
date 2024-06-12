import { ApiIdentifier } from '@types';
import { HostEventLink } from '../host-event-link.entity';

export interface DeleteHostEventLinkBodyDto {
	host_uid: ApiIdentifier;
	event_uid: ApiIdentifier;
}

export interface DeleteHostEventLinkResponseDto extends HostEventLink {}
