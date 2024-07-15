import { TimingConfig } from '@types';
import {
	SharedValue,
	useSharedValue,
	withTiming
} from 'react-native-reanimated';

const defaultUserConfig: TimingConfig = {
	duration: 200
};

interface IUseAnimatedState {
	animatedValue: SharedValue<number>;
	set: (value: number) => void;
	toggle: () => void;
	on: () => void;
	off: () => void;
}

const useAnimatedState = (
	initialValue: number = 0,
	userConfig: TimingConfig | undefined = {}
): IUseAnimatedState => {
	/**
	 * This is specifically for integer-related
	 * animated values.
	 */

	const animatedValue = useSharedValue<number>(initialValue);
	const animatedConfig = Object.assign(userConfig, defaultUserConfig);

	const set = (value: number) => {
		animatedValue.value = withTiming(value, animatedConfig);
	};

	const toggle = () => {
		animatedValue.value = withTiming(
			animatedValue.value === 0 ? 1 : 0,
			animatedConfig
		);
	};

	const on = () => {
		animatedValue.value = withTiming(1, animatedConfig);
	};

	const off = () => {
		animatedValue.value = withTiming(0, animatedConfig);
	};

	return {
		animatedValue,
		set,
		toggle,
		on,
		off
	};
};

export default useAnimatedState;
