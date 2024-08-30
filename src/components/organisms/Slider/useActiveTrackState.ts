import { useState } from 'react';
import { ActiveTrackState } from './settings';

interface IUseActiveTrackState {
	setMin: (value: number) => void;
	setMax: (value: number) => void;
	activeTrackState: ActiveTrackState;
	setActiveTrackState: (state: ActiveTrackState) => void;
}

const useActiveTrackState = (
	defaultState?: Partial<ActiveTrackState>
): IUseActiveTrackState => {
	const [activeTrackState, setActiveTrackState] = useState({
		minValue: 0,
		maxValue: 0,
		...defaultState
	});

	const setMin = (value: number) => {
		setActiveTrackState({
			...activeTrackState,
			minValue: value
		});
	};

	const setMax = (value: number) => {
		setActiveTrackState({
			...activeTrackState,
			maxValue: value
		});
	};

	return {
		setMin,
		setMax,
		activeTrackState,
		setActiveTrackState
	};
};

export default useActiveTrackState;
