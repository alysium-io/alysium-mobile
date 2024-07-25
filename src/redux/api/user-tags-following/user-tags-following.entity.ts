import { Tag } from '../tag';

export interface UserTagsFollowing {
	readonly tag: Tag;
	readonly created_at: Date;
}
