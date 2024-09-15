import { useState } from 'react';

export type ButtonState = 'active' | 'loading' | 'disabled' | 'success';

interface IUseButtonState {
	buttonState: ButtonState;
	setButtonState: (buttonState: ButtonState) => void;
	success: () => void;
}

const useButtonState = (
	defaultState: ButtonState = 'active'
): IUseButtonState => {
	const [buttonState, setButtonState] = useState<ButtonState>(defaultState);

	const success = () => {
		setButtonState('success');
		setTimeout(() => {
			setButtonState('active');
		}, 500);
	};

	return {
		buttonState,
		setButtonState,
		success
	};
};

export default useButtonState;
