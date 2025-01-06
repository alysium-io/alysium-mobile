import { Scene } from '../scene';

export interface UserScenesFollowing {
	readonly scene: Scene;
	readonly created_at: Date;
}
