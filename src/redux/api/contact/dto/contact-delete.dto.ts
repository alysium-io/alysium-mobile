import { NanoId } from '@types';
import { Contact } from '../contact.entity';

export interface DeleteContactParamsDto {
	readonly artist_uid: NanoId;
	readonly contact_uid: NanoId;
}

export interface DeleteContactResponseDto extends Contact {}
