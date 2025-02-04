import { EventMedia } from '@flux/api/event-media/event-media.entity';
import { Dayjs } from 'dayjs';

export type SquareStateItem = {
	id: string;
	type: 'loading' | 'add' | 'image';
	uri?: string;
	created_at?: Dayjs;
	eventMedia?: EventMedia;
};
