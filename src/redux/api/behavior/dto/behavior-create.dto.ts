import { ApiIdentifier } from '@types';

export interface CreateBehaviorBodyDto {
	action: string;
	action_at: string;
	hard_session_uid: ApiIdentifier;
	hard_session_at: string;
	soft_session_uid: ApiIdentifier;
	soft_session_at: string;
	funnel_uid?: ApiIdentifier;
	funnel_at?: string;
	funnel_step?: number;
	user_uid?: ApiIdentifier;
	data?: any;
	environment?: any;
	device?: any;
}

export interface CreateBehaviorResponseDto {}
