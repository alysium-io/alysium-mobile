import { useAnimatedKeyboard, useAnimatedStyle } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface IUseAnimatedFooterHeight {
	animatedMarginBottom: ReturnType<typeof useAnimatedStyle>;
}

const useAnimatedFooterHeight = (): IUseAnimatedFooterHeight => {
	const insets = useSafeAreaInsets();
	const keyboardPosition = useAnimatedKeyboard();
	const animatedMarginBottom = useAnimatedStyle(() => {
		return {
			marginBottom: insets.bottom + keyboardPosition.height.value
		};
	}, []);

	return {
		animatedMarginBottom
	};
};

export default useAnimatedFooterHeight;
