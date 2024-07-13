import { useState } from 'react';

export interface ToggleApi {
	state: boolean;
	setState: (value: boolean) => void;
	toggle: () => void;
	on: () => void;
	off: () => void;
}

const useToggle = (defaultState: boolean = false): ToggleApi => {
	const [state, setState] = useState(defaultState);
	const toggle = () => setState(!state);
	const on = () => setState(true);
	const off = () => setState(false);

	return {
		state,
		setState,
		toggle,
		on,
		off
	};
};

export default useToggle;
