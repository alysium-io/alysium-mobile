import { useState } from 'react';
import { Keyboard } from 'react-native';

export interface SequenceApi {
	next: () => void;
	back: () => void;
	reset: () => void;
	sequenceIndex: number;
	numItems: number;
	goTo: (index: number) => void;
}

const useSequence = (
	numItems: number,
	defaultIndex: number = 0
): SequenceApi => {
	const [sequenceIndex, setSequenceIndex] = useState<number>(defaultIndex);

	const next = () => {
		Keyboard.dismiss();
		setSequenceIndex(Math.min(numItems - 1, sequenceIndex + 1));
	};

	const back = () => {
		Keyboard.dismiss();
		setSequenceIndex(Math.max(0, sequenceIndex - 1));
	};

	const reset = () => {
		Keyboard.dismiss();
		setSequenceIndex(0);
	};

	const goTo = (index: number) => {
		Keyboard.dismiss();
		if (index < 0 || index > numItems) {
			throw new Error('Index out of bounds');
		}
		setSequenceIndex(index);
	};

	// Validate that the default index is within bounds
	if (defaultIndex < 0 || defaultIndex > numItems) {
		throw new Error('Default index out of bounds');
	}

	return {
		next,
		back,
		reset,
		sequenceIndex,
		numItems,
		goTo
	};
};

export default useSequence;
