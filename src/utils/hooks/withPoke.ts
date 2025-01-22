import { isEqual } from 'lodash';
import { useCallback, useEffect, useReducer, useRef } from 'react';

type PokeConfig<T> = {
	/** The interval in seconds between each check. Defaults to 1 second */
	interval?: number;
	/** The function to run on each interval. If not provided, will force update on every interval */
	checkFn?: () => T | Promise<T>;
	/** Whether the poke should start immediately */
	enabled?: boolean;
	/** Debug level: 0 = no logs, 1 = rerenders only, 2 = verbose */
	debug?: 0 | 1 | 2;
	/** Identifier for debug logging to track where the poke originated */
	name?: string;
};

interface IPoke<T> {
	clear: () => void;
	start: () => void;
	isRunning: boolean;
}

/**
 * A hook that runs a check function (`checkFn`) at a specified interval and triggers
 * a rerender when the return value changes.
 *
 * If no `checkFn` is provided, it will always rerender at every interval.
 *
 * @param config Configuration object for the poke behavior
 * @returns Object containing control functions and current running state
 */
const withPoke = <T>(config: PokeConfig<T>): IPoke<T> => {
	const {
		interval = 1, // Default to 1 second
		checkFn,
		enabled = true,
		debug = 0,
		name = 'unnamed'
	} = config;

	// Use reducer instead of state to guarantee state updates trigger rerenders
	const [, forceUpdate] = useReducer((x) => x + 1, 0);

	// Store the interval ID in a ref to prevent it from being cleared unnecessarily
	const intervalRef = useRef<NodeJS.Timeout | null>(null);

	// Store the latest value to compare against
	const lastValueRef = useRef<T>();

	// Store the enabled state in a ref to access it in the interval callback
	const enabledRef = useRef(enabled);
	enabledRef.current = enabled;

	// Store the check function in a ref to maintain hook context
	const checkFnRef = useRef(checkFn);
	checkFnRef.current = checkFn;

	// Function to clear the existing interval
	const clear = () => {
		if (intervalRef.current) {
			clearInterval(intervalRef.current);
			intervalRef.current = null;
		}
	};

	// Create a stable check function that maintains hook context
	const executeCheck = useCallback(async () => {
		if (!enabledRef.current) return;

		if (debug === 2) {
			console.log(`[Poke${name ? ` - ${name}` : ''}] Executing check`);
		}

		try {
			// If no check function is provided, always force an update
			if (!checkFnRef.current) {
				forceUpdate();
				if (debug >= 1)
					console.log(
						`[Poke${
							name ? ` - ${name}` : ''
						}] Forced update (no check function)`
					);
				return;
			}

			// Call the function within the hook context
			const newValue = await checkFnRef.current();

			// Use lodash's isEqual for deep comparison of any value type
			if (!isEqual(newValue, lastValueRef.current)) {
				lastValueRef.current = newValue;
				forceUpdate();
				if (debug >= 1)
					console.log(
						`[Poke${
							name ? ` - ${name}` : ''
						}] Value changed, triggering update`,
						{ oldValue: lastValueRef.current, newValue }
					);
			} else if (debug === 2) {
				console.log(`[Poke${name ? ` - ${name}` : ''}] Value unchanged`, {
					value: newValue
				});
			}
		} catch (error) {
			console.error(
				`[Poke${name ? ` - ${name}` : ''}] Error in check function:`,
				error
			);
		}
	}, [debug, name]);

	// Function to start the interval
	const start = useCallback(() => {
		clear();
		intervalRef.current = setInterval(executeCheck, interval * 1000);
	}, [interval, executeCheck]);

	useEffect(() => {
		if (enabled) {
			start();
		} else {
			clear();
		}

		return clear;
	}, [enabled, start]);

	return {
		clear,
		start,
		isRunning: !!intervalRef.current
	};
};

export default withPoke;
