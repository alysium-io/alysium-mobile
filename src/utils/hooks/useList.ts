import _ from 'lodash';
import { useCallback, useState } from 'react';

export interface ListConfig<T> {
	initialState?: T[];
	limit?: number;
	validator?: (a: T, b: T) => boolean;
}

export interface ListApi<T> {
	/**
	 * The current active state.
	 */
	state: T[];

	/**
	 * Add an item to the list.
	 * Does nothing if the item already exists in the list.
	 */
	add: (item: T) => void;

	/**
	 * Remove an item from the list.
	 * Does nothing if the item does not exist in the list.
	 */
	remove: (item: T) => void;

	/**
	 * Toggle an item in the list.
	 * If the item exists in the list, it will be removed.
	 * @returns `true` if the item was added, `false` if it was removed.
	 */
	toggle: (item: T) => boolean;

	/**
	 * Check if an item exists in the list.
	 * You can provide a custom `validator` function to compare items.
	 */
	exists: (item: T) => boolean;

	/**
	 * Scan the list for items that match the provided item.
	 * @returns a list of items that match the provided item.
	 */
	scan: (item: T | Partial<T>) => T[];

	/**
	 * Reset the list to an empty state.
	 */
	reset: () => void;

	/**
	 * Set the list to a new state.
	 * If the list has a limit, it will be truncated.
	 * Otherwise, it will be set to the new state.
	 */
	set: (items: T[]) => void;

	/**
	 * Merge new items into the list.
	 * If the list has a limit, it will be truncated.
	 * Otherwise, it will be merged with the new items.
	 */
	merge: (items: T[]) => void;

	/**
	 * Check if at least one item in the list matches the provided partial item.
	 * @returns `true` if a match is found, `false` otherwise.
	 */
	isIn: (item: Partial<T>) => boolean;

	/**
	 * Check if the list is empty
	 */
	isEmpty: boolean;

	/**
	 * Get the current state of the list.
	 */
	getState: () => T[];
}

export default function useList<T>(config: ListConfig<T> = {}): ListApi<T> {
	const { initialState = [], limit, validator = _.isEqual } = config;
	const [state, setState] = useState<T[]>(initialState);

	const exists = useCallback(
		(item: T): boolean => {
			return state.some((stateItem) => validator(stateItem, item));
		},
		[state, validator]
	);

	const add = useCallback(
		(item: T): void => {
			if (!exists(item) && (!limit || state.length < limit)) {
				setState((prevState) => [...prevState, item]);
			}
		},
		[exists, state, limit]
	);

	const remove = useCallback(
		(item: T): void => {
			setState((prevState) =>
				prevState.filter((stateItem) => !validator(stateItem, item))
			);
		},
		[validator]
	);

	const toggle = useCallback(
		(item: T): boolean => {
			if (exists(item)) {
				remove(item);
				return false;
			} else if (!limit || state.length < limit) {
				add(item);
				return true;
			} else {
				return false;
			}
		},
		[exists, remove, add]
	);

	const reset = useCallback((): void => {
		setState([]);
	}, []);

	const set = useCallback(
		(items: T[]): void => {
			if (limit) {
				setState(items.slice(0, limit));
			} else {
				setState(items);
			}
		},
		[limit]
	);

	const merge = useCallback(
		(items: T[]): void => {
			setState((prevState) => {
				const newItems = items.filter((item) => !exists(item));
				const mergedList = [...prevState, ...newItems];
				return limit ? mergedList.slice(0, limit) : mergedList;
			});
		},
		[exists, limit]
	);

	const scan = useCallback(
		(item: Partial<T>): T[] => {
			return state.filter((stateItem) =>
				Object.keys(item).every((key) =>
					_.isEqual(stateItem[key as keyof T], item[key as keyof T])
				)
			);
		},
		[state]
	);

	const isIn = useCallback(
		(item: Partial<T>): boolean => {
			return scan(item).length > 0;
		},
		[scan]
	);

	const getState = useCallback((): T[] => state, [state]);

	return {
		state,
		add,
		remove,
		toggle,
		exists,
		reset,
		set,
		merge,
		scan,
		isIn,
		get isEmpty() {
			return state.length === 0;
		},
		getState
	};
}
