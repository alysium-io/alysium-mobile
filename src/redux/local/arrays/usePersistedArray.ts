import { RootState, useDispatch, useSelector } from '@flux';
import {
	persistedArrayActions,
	persistedArrayReducers
} from './configPersistedArrays';

interface PersistedArray<T> {
	items: T[];
	limit: number;
	add: (item: T) => void;
	remove: (item: T) => void;
	reset: () => void;
	isEmpty: boolean;
	isFull: boolean;
	size: number;
}

export function usePersistedArray<
	T extends RootState[keyof typeof persistedArrayReducers]['items'][number]
>(key: keyof typeof persistedArrayReducers): PersistedArray<T> {
	const dispatch = useDispatch();
	const { items, limit } = useSelector((state: RootState) => state[key]);

	return {
		items: items as T[],
		limit,
		add: (item: T) => dispatch(persistedArrayActions[key].add(item)),
		remove: (item: T) => dispatch(persistedArrayActions[key].remove(item)),
		reset: () => dispatch(persistedArrayActions[key].reset()),
		isEmpty: items.length === 0,
		isFull: items.length === limit,
		size: items.length
	};
}
