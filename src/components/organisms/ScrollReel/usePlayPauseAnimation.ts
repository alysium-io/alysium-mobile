import { Vibrator } from '@etc';
import {
	SharedValue,
	useSharedValue,
	withTiming
} from 'react-native-reanimated';

interface IUsePlayPauseAnimation {
	playAnimatedValue: SharedValue<number>;
	pauseAnimatedValue: SharedValue<number>;
	runPlayAnimation: () => void;
	runPauseAnimation: () => void;
}

const usePlayPauseAnimation = (): IUsePlayPauseAnimation => {
	const playAnimatedValue = useSharedValue(0);
	const pauseAnimatedValue = useSharedValue(0);

	const runPlayAnimation = () => {
		playAnimatedValue.value = 1;
		playAnimatedValue.value = withTiming(0, { duration: 500 });
		Vibrator.light();
	};

	const runPauseAnimation = () => {
		pauseAnimatedValue.value = 1;
		pauseAnimatedValue.value = withTiming(0, { duration: 500 });
		Vibrator.light();
	};

	return {
		playAnimatedValue,
		pauseAnimatedValue,
		runPlayAnimation,
		runPauseAnimation
	};
};

export default usePlayPauseAnimation;
