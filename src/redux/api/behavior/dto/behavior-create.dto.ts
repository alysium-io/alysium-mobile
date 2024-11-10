import { NanoId } from '@types';

export interface CreateBehaviorBodyDto {
	action: string;
	action_at: string;
	hard_session_uid: NanoId;
	hard_session_at: string;
	soft_session_uid: NanoId;
	soft_session_at: string;
	funnel_uid?: NanoId;
	funnel_at?: string;
	funnel_step?: number;
	user_uid?: NanoId;
	data?: any;
	environment?: any;
	device?: any;
}

export interface CreateBehaviorResponseDto {}
