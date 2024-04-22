import { ButtonState } from '@molecules';
import { useState } from 'react';

const useButton = (defaultButtonState: ButtonState = 'default') => {
	const [buttonState, setButtonState] =
		useState<ButtonState>(defaultButtonState);

	const _setButtonState = (state: ButtonState) => {
		if (state !== buttonState) {
			setButtonState(state);
		}
	};

	return {
		buttonState,
		setButtonState: _setButtonState
	};
};

export default useButton;
