import { useRef, useState } from 'react';

export interface SequenceApi {
	state: number;
	reset: () => void;
	next: () => void;
	back: () => void;
	prevState: React.MutableRefObject<number>;
}

const useSequence = (): SequenceApi => {
	const [state, setState] = useState<number>(0);
	const prevState = useRef<number>(state);

	const reset = () => {
		prevState.current = state;
		setState(0);
	};

	const next = () => {
		prevState.current = state;
		setState(state + 1);
	};

	const back = () => {
		prevState.current = state;
		setState(Math.max(0, state - 1));
	};

	return {
		state,
		reset,
		next,
		back,
		prevState
	};
};

export default useSequence;
