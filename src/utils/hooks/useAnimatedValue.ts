import { useSharedValue, withTiming } from 'react-native-reanimated';

const useAnimatedValue = () => {
	const animatedValue = useSharedValue<number>(0);
	const toggle = () => {
		animatedValue.value = withTiming(animatedValue.value === 0 ? 1 : 0, {
			duration: 500
		});
	};

	return {
		animatedValue,
		toggle
	};
};

export default useAnimatedValue;
