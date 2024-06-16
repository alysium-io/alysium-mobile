import { ApiIdentifier } from '@types';
import { Event } from '../event/event.entity';
import { Host } from '../host/host.entity';

export interface HostEventLink {
	readonly event_uid: ApiIdentifier;
	readonly host_uid: ApiIdentifier;
	readonly event: Event;
	readonly host: Host;
}
