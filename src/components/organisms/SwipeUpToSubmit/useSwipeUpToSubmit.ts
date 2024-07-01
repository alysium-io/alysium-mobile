import { useState } from 'react';
import {
	AnimatedStyle,
	SharedValue,
	useAnimatedStyle,
	useSharedValue,
	withTiming
} from 'react-native-reanimated';
import { SwipeUpToSubmitStage } from './types';

interface IUseSwipeUpToSubmit {
	stage: SwipeUpToSubmitStage;
	setStage: (stage: SwipeUpToSubmitStage) => void;
	onCommit: () => void;
	onCommitSuccess: () => void;
	swipeUpToSubmitTextOpacity: SharedValue<number>;
	swipeUpToSubmitTextContainerStyles: AnimatedStyle;
	onDragUpdate: (translateY: number) => void;
	onCancelCommit: () => void;
	resetAll: () => void;
}

const useSwipeUpToSubmit = (): IUseSwipeUpToSubmit => {
	const [stage, setStage] = useState<SwipeUpToSubmitStage>('start');

	const swipeUpToSubmitTextOpacity = useSharedValue<number>(1);
	const swipeUpToSubmitTextContainerStyles = useAnimatedStyle(() => {
		return {
			opacity: swipeUpToSubmitTextOpacity.value
		};
	}, []);

	const onCommit = () => {
		setStage('submitted');
	};

	const onCommitSuccess = () => {
		setStage('submitSuccess');
	};

	const onDragUpdate = (translateY: number) => {
		'worklet';
		swipeUpToSubmitTextOpacity.value = translateY;
	};

	const onCancelCommit = () => {
		'worklet';
		swipeUpToSubmitTextOpacity.value = withTiming(1);
	};

	const resetAll = () => {
		setStage('start');
		swipeUpToSubmitTextOpacity.value = 1;
	};

	return {
		stage,
		setStage,
		onCommit,
		onCommitSuccess,
		swipeUpToSubmitTextOpacity,
		swipeUpToSubmitTextContainerStyles,
		onDragUpdate,
		onCancelCommit,
		resetAll
	};
};

export default useSwipeUpToSubmit;
