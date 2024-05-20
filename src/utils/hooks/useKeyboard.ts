import { useDispatch, useSelector } from '@flux';
import { keyboardActions } from '@flux/local/keyboard';
import { useEffect, useState } from 'react';
import { Keyboard, KeyboardEvent } from 'react-native';

const useKeyboard = () => {
	const dispatch = useDispatch();
	const persistedKeyboard = useSelector((state) => state.persistedKeyboard);

	const [isVisible, setIsVisible] = useState(false);

	const setKeyboardHeight = (height: number) => {
		if (height !== persistedKeyboard.height) {
			dispatch(keyboardActions.setKeyboardHeight(height));
		}
	};

	const onKeyboardShow = (e: KeyboardEvent) => {
		setKeyboardHeight(e.endCoordinates.height);
		setIsVisible(true);
	};

	const onKeyboardHide = () => {
		setIsVisible(false);
	};

	useEffect(() => {
		const showSubscription = Keyboard.addListener(
			'keyboardDidShow',
			onKeyboardShow
		);
		const hideSubscription = Keyboard.addListener(
			'keyboardDidHide',
			onKeyboardHide
		);

		return () => {
			showSubscription.remove();
			hideSubscription.remove();
		};
	}, []);

	return {
		isVisible,
		height: persistedKeyboard.height
	};
};

export default useKeyboard;
