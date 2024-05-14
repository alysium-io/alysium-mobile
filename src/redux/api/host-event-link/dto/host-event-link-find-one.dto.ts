import { ApiIdentifier } from '@types';
import { HostEventLink } from '../host-event-link.entity';

export interface FindOneHostEventLinkParamsDto {
	host_event_id: ApiIdentifier;
}

export interface FindOneHostEventLinkResponseDto extends HostEventLink {}
