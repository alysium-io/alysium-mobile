import { collectDeviceInfo, Formatting } from '@etc';
import { behaviorApiSlice } from '@flux/api/behavior';
import { CreateBehaviorBodyDto } from '@flux/api/behavior/dto/behavior-create.dto';
import { createUseContextHook } from '@hooks';
import { generate_nanoid } from '@src/etc/nanoid';
import { NanoId, ProviderProps, RouteNames } from '@types';
import React, { createContext, useEffect, useState } from 'react';
import { AppState } from 'react-native';
import { useEnvContext } from './ValidateEnv';

export type NavigationBehaviorMetadata = {
	from: RouteNames;
	from_uid?: NanoId;
	to: RouteNames;
	to_uid?: NanoId;
	using: string;
};

export type BehaviorContextType = {
	behavior: (
		action: string,
		data?: any,
		funnelData?: Pick<
			CreateBehaviorBodyDto,
			'funnel_uid' | 'funnel_at' | 'funnel_step'
		>
	) => Promise<void>;
	getCurrentTimestamp: () => string;
	setBehaviorUserUid: React.Dispatch<React.SetStateAction<string | undefined>>;
	navigationBehavior: (meta: NavigationBehaviorMetadata) => void;
};

export const BehaviorContext = createContext({} as BehaviorContextType);

export const BehaviorProvider: React.FC<ProviderProps> = ({ children }) => {
	const [createBehaviorMutation] = behaviorApiSlice.useCreateBehaviorMutation();
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
				behavior('APP_CLOSED');
			}
		};

		AppState.addEventListener('change', handleAppStateChange);
	}, []);

	const getDefaultBehaviorData = async (
		action: string,
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
		action: string,
		data?: any,
		funnelData?: Pick<
			CreateBehaviorBodyDto,
			'funnel_uid' | 'funnel_at' | 'funnel_step'
		>
	): Promise<void> => {
		const behaviorData = await getDefaultBehaviorData(action, data, funnelData);
		createBehaviorMutation({
			body: behaviorData
		}).catch((err: any) => {
			console.error('Error creating behavior:', err);
		});
	};

	const navigationBehavior = (meta: NavigationBehaviorMetadata) => {
		behavior('NAVIGATE', meta);
	};

	return (
		<BehaviorContext.Provider
			value={{
				behavior,
				getCurrentTimestamp,
				setBehaviorUserUid,
				navigationBehavior
			}}
		>
			{children}
		</BehaviorContext.Provider>
	);
};

export const useBehaviorContext = createUseContextHook<BehaviorContextType>(
	BehaviorContext,
	'BehaviorContext'
);

export const useBehaviorFunnel = (action: string) => {
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
