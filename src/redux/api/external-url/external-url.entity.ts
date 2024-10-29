import { ApiIdentifier } from '@types';

export interface ExternalUrl {
	readonly name: string;
	readonly url: string;
	readonly external_url_uid: ApiIdentifier;
}
