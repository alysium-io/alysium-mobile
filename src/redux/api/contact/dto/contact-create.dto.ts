import { NanoId } from '@types';
import { Contact } from '../contact.entity';

export interface CreateContactParamsDto {
	readonly artist_uid: NanoId;
}

export interface CreateContactBodyDto {
	readonly name: string;
	readonly role?: string | null;
	readonly phone_number?: string | null;
	readonly email?: string | null;
}

export interface CreateContactResponseDto extends Contact {}
