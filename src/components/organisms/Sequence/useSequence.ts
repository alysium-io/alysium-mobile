import { useState } from 'react';
import { Keyboard } from 'react-native';

export interface SequenceApi {
	next: () => void;
	back: () => void;
	reset: () => void;
	sequenceIndex: number;
	numItems: number;
}

export const useSequence = (numItems: number): SequenceApi => {
	const [sequenceIndex, setSequenceIndex] = useState<number>(0);

	const next = () => {
		Keyboard.dismiss();
		setSequenceIndex(Math.min(numItems, sequenceIndex + 1));
	};

	const back = () => {
		Keyboard.dismiss();
		setSequenceIndex(Math.max(0, sequenceIndex - 1));
	};

	const reset = () => {
		Keyboard.dismiss();
		setSequenceIndex(0);
	};

	return {
		next,
		back,
		reset,
		sequenceIndex,
		numItems
	};
};
