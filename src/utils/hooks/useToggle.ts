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

	return {
		state,
		setState,
		toggle: () => setState(!state),
		on: () => setState(true),
		off: () => setState(false),
		set: setState
	};
};

export default useToggle;
