import { ApiIdentifier } from '@types';
import { HostEventLink } from '../host-event-link.entity';

export interface UpdateHostEventLinkParamsDto {
	host_event_uid: ApiIdentifier;
}

export interface UpdateHostEventLinkResponseDto extends HostEventLink {}
