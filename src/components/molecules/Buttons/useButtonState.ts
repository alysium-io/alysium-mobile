import { useState } from 'react';

export type ButtonState = 'active' | 'loading' | 'disabled' | 'success';

export interface ButtonStateApi {
	buttonState: ButtonState;
	setButtonState: (buttonState: ButtonState) => void;
	buttonSuccess: () => void;
}

const useButtonState = (
	defaultState: ButtonState = 'active'
): ButtonStateApi => {
	const [buttonState, setButtonState] = useState<ButtonState>(defaultState);

	const buttonSuccess = () => {
		setButtonState('success');
		setTimeout(() => {
			setButtonState('active');
		}, 1000);
	};

	return {
		buttonState,
		setButtonState,
		buttonSuccess
	};
};

export default useButtonState;
