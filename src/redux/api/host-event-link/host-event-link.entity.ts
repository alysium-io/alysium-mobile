import { ApiIdentifier } from '@types';
import { Event } from '../event/event.entity';
import { Host } from '../host/host.entity';

export interface HostEventLink {
	event_id: ApiIdentifier;
	host_id: ApiIdentifier;
	event: Event;
	host: Host;
}
