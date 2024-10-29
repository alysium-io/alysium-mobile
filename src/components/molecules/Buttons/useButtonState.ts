import { useState } from 'react';

export type ButtonState = 'active' | 'loading' | 'disabled' | 'success';

export interface ButtonStateApi {
	buttonState: ButtonState;
	setButtonState: (buttonState: ButtonState) => void;
	buttonSuccess: () => void;
	reset: () => void;
}

const useButtonState = (
	defaultState: ButtonState = 'active'
): ButtonStateApi => {
	const [initialButtonState] = useState<ButtonState>(defaultState);
	const [buttonState, setButtonState] = useState<ButtonState>(defaultState);

	const buttonSuccess = () => {
		return new Promise((resolve) => {
			setButtonState('success');
			setTimeout(() => {
				setButtonState('active');
				resolve(undefined);
			}, 1500);
		});
	};

	const reset = () => {
		setButtonState(initialButtonState);
	};

	return {
		buttonState,
		setButtonState,
		buttonSuccess,
		reset
	};
};

export default useButtonState;
