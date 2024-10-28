import { useState } from 'react';

export interface ToggleApi {
	state: boolean;
	setState: (value: boolean) => void;
	toggle: () => void;
	on: () => void;
	off: () => void;
	set: (value: boolean) => void;
}

const useToggle = (defaultState: boolean = false): ToggleApi => {
	const [state, setState] = useState(defaultState);

	const toggle = () => {
		const newState = !state;
		if (newState !== state) {
			setState(newState);
		}
	};

	const on = () => {
		if (state !== true) {
			setState(true);
		}
	};

	const off = () => {
		if (state !== false) {
			setState(false);
		}
	};

	const set = (value: boolean) => {
		if (value !== state) {
			setState(value);
		}
	};

	return {
		state,
		setState,
		toggle,
		on,
		off,
		set
	};
};

export default useToggle;
