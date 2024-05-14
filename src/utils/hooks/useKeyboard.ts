import { useEffect, useState } from 'react';
import { Keyboard, KeyboardEvent } from 'react-native';

const useKeyboard = () => {
	const [keyboardInfo, setKeyboardInfo] = useState<{
		isVisible: boolean;
		height: number;
	}>({
		isVisible: false,
		height: 0
	});

	const onKeyboardShow = (e: KeyboardEvent) => {
		setKeyboardInfo({
			isVisible: true,
			height: e.endCoordinates.height
		});
	};

	const onKeyboardHide = () => {
		setKeyboardInfo({
			isVisible: false,
			height: 0
		});
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

	return keyboardInfo;
};

export default useKeyboard;
