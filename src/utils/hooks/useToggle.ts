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
	const toggle = () => setState(!state);
	const on = () => setState(true);
	const off = () => setState(false);
	const set = (value: boolean) => setState(value);

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
