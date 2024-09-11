import { collectDeviceInfo, Formatting } from '@etc';
import { behaviorApiSlice } from '@flux/api/behavior';
import { CreateBehaviorBodyDto } from '@flux/api/behavior/dto/behavior-create.dto';
import { createUseContextHook } from '@hooks';
import { generate_nanoid } from '@src/etc/nanoid';
import { ProviderProps } from '@types';
import React, { createContext, useEffect, useState } from 'react';
import { AppState } from 'react-native';
import { useEnvContext } from './ValidateEnv';

export enum BehaviorAction {
	APP_CLOSED = 'APP_CLOSED',
	PAGEVIEW_PUBLIC_ARTIST = 'PAGEVIEW_PUBLIC_ARTIST',
	PAGEVIEW_PUBLIC_TAG = 'PAGEVIEW_PUBLIC_TAG',
	PAGEVIEW_USER_ARTISTS_FOLLOWING = 'PAGEVIEW_USER_ARTISTS_FOLLOWING',
	PAGEVIEW_USER_TAGS_FOLLOWING = 'PAGEVIEW_USER_TAGS_FOLLOWING',
	PAGEVIEW_TOP_TAGS = 'PAGEVIEW_TOP_TAGS',
	REFRESH_HOME_DISCOVER_TAGS = 'REFRESH_HOME_DISCOVER_TAGS',
	POPUP_ABOUT_ALYSIUM = 'POPUP_ABOUT_ALYSIUM',
	POPUP_PRIVACY_POLICY = 'POPUP_PRIVACY_POLICY',
	POPUP_TERMS_OF_SERVICE = 'POPUP_TERMS_OF_SERVICE',
	PRESSED_CORRELATED_TAG = 'PRESSED_CORRELATED_TAG',
	PRESSED_ARTIST_TAG = 'PRESSED_ARTIST_TAG',
	EXTERNAL_LINK_SPOTIFY_ARTIST = 'EXTERNAL_LINK_SPOTIFY_ARTIST',
	FOLLOW_ARTIST = 'FOLLOW_ARTIST',
	UNFOLLOW_ARTIST = 'UNFOLLOW_ARTIST',
	FOLLOW_TAG = 'FOLLOW_TAG',
	UNFOLLOW_TAG = 'UNFOLLOW_TAG',
	PRESSED_LOGOUT = 'PRESSED_LOGOUT',
	FUNNEL_AUTHENTICATION = 'FUNNEL_AUTHENTICATION',
	PRESSED_RELATED_ARTIST = 'PRESSED_RELATED_ARTIST'
}

export type BehaviorContextType = {
	behavior: (
		action: BehaviorAction,
		data?: any,
		funnelData?: Pick<
			CreateBehaviorBodyDto,
			'funnel_uid' | 'funnel_at' | 'funnel_step'
		>
	) => Promise<void>;
	getCurrentTimestamp: () => string;
	setBehaviorUserUid: React.Dispatch<React.SetStateAction<string | undefined>>;
};

export const BehaviorContext = createContext({} as BehaviorContextType);

export const BehaviorProvider: React.FC<ProviderProps> = ({ children }) => {
	const [createBehaviorMutation] = behaviorApiSlice.useCreateMutation();
	const environment = useEnvContext();
	const [user_uid, setBehaviorUserUid] = useState<string | undefined>(
		undefined
	);

	const getCurrentTimestamp = (): string => {
		return Formatting.toUtcIsoFormat(new Date()) as string;
	};

	const [hard_session_uid, setHardSessionUid] = useState<string>(
		generate_nanoid()
	);
	const [hard_session_at, setHardSessionAt] = useState<string>(
		getCurrentTimestamp()
	);
	const [soft_session_uid, setSoftSessionUid] = useState<string>(
		generate_nanoid()
	);
	const [soft_session_at, setSoftSessionAt] = useState<string>(
		getCurrentTimestamp()
	);

	useEffect(() => {
		setHardSessionUid(generate_nanoid());
		setHardSessionAt(getCurrentTimestamp());

		const handleAppStateChange = (nextAppState: string) => {
			// Check if the app has "come to the foreground from the background"
			// In other words, if the app has been soft closed, then we want
			// to set a new soft session uid.
			if (nextAppState === 'active') {
				const newSoftSessionUid = generate_nanoid();
				const newSoftSessionAt = getCurrentTimestamp();
				setSoftSessionUid(newSoftSessionUid);
				setSoftSessionAt(newSoftSessionAt);
			}

			// Check if the app has been hard closed
			if (nextAppState === 'background') {
				behavior(BehaviorAction.APP_CLOSED);
			}
		};

		AppState.addEventListener('change', handleAppStateChange);
	}, []);

	const getDefaultBehaviorData = async (
		action: BehaviorAction,
		data?: any,
		funnelData?: Pick<
			CreateBehaviorBodyDto,
			'funnel_uid' | 'funnel_at' | 'funnel_step'
		>
	): Promise<CreateBehaviorBodyDto> => {
		const device = await collectDeviceInfo();
		const action_at = getCurrentTimestamp();
		const behaviorData: CreateBehaviorBodyDto = {
			action,
			action_at,
			hard_session_uid,
			hard_session_at,
			soft_session_uid,
			soft_session_at,
			...funnelData,
			user_uid,
			data,
			environment,
			device
		};
		return behaviorData;
	};

	const behavior = async (
		action: BehaviorAction,
		funnelData?: Pick<
			CreateBehaviorBodyDto,
			'funnel_uid' | 'funnel_at' | 'funnel_step'
		>,
		data?: any
	): Promise<void> => {
		const behaviorData = await getDefaultBehaviorData(action, funnelData, data);
		createBehaviorMutation({
			body: behaviorData
		}).catch((err: any) => {
			console.error('Error creating behavior:', err);
		});
	};

	return (
		<BehaviorContext.Provider
			value={{ behavior, getCurrentTimestamp, setBehaviorUserUid }}
		>
			{children}
		</BehaviorContext.Provider>
	);
};

export const useBehaviorContext = createUseContextHook<BehaviorContextType>(
	BehaviorContext,
	'BehaviorContext'
);

export const useBehaviorFunnel = (action: BehaviorAction) => {
	const { behavior, getCurrentTimestamp } = useBehaviorContext();
	const [funnel_uid] = useState<string>(generate_nanoid());

	const funnel = async (funnel_step: number, data?: any): Promise<void> => {
		behavior(action, data, {
			funnel_uid,
			funnel_at: getCurrentTimestamp(),
			funnel_step
		});
	};

	return { funnel };
};
