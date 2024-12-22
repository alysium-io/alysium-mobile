import { Event } from '@flux/api/event';
import { ComplexEventStatus } from '@flux/api/event/types';
import { useEffect, useRef, useState } from 'react';
import useEvent from './useEvent';

interface ComplexEventStatusesConfig {
	withPoke?: boolean;
	pokeInterval?: number;
}

interface ComplexEventStatusesApi {
	statusMap: Map<string, ComplexEventStatus>;
}

const defaultConfig: Required<ComplexEventStatusesConfig> = {
	withPoke: true,
	pokeInterval: 5
};

const useComplexEventStatuses = (
	events?: Event[],
	userConfig: ComplexEventStatusesConfig = {}
): ComplexEventStatusesApi => {
	const config = { ...defaultConfig, ...userConfig };
	const { calculateComplexStatus } = useEvent();
	const [statusMap, setStatusMap] = useState<Map<string, ComplexEventStatus>>(
		new Map()
	);
	const previousStatusMapRef = useRef<Map<string, ComplexEventStatus>>(
		new Map()
	);
	const intervalIdRef = useRef<NodeJS.Timeout>();

	const calculateAllStatuses = () => {
		const newMap = new Map<string, ComplexEventStatus>();
		events?.forEach((event) => {
			const status = calculateComplexStatus(event);
			if (status) newMap.set(event.event_uid, status);
		});
		return newMap;
	};

	const hasStatusesChanged = (
		oldMap: Map<string, ComplexEventStatus>,
		newMap: Map<string, ComplexEventStatus>
	): boolean => {
		if (oldMap.size !== newMap.size) return true;

		for (const [key, value] of newMap) {
			if (oldMap.get(key) !== value) return true;
		}

		return false;
	};

	useEffect(() => {
		const clearExistingInterval = () => {
			if (intervalIdRef.current) {
				clearInterval(intervalIdRef.current);
				intervalIdRef.current = undefined;
			}
		};

		const initialStatuses = calculateAllStatuses();
		if (hasStatusesChanged(previousStatusMapRef.current, initialStatuses)) {
			setStatusMap(initialStatuses);
			previousStatusMapRef.current = initialStatuses;
		}

		if (config.withPoke) {
			// Only continue polling if we have any non-terminal events
			const hasActiveEvents = Array.from(initialStatuses.values()).some(
				(status) =>
					status !== ComplexEventStatus.archived &&
					status !== ComplexEventStatus.canceled
			);

			if (hasActiveEvents) {
				intervalIdRef.current = setInterval(() => {
					const newStatuses = calculateAllStatuses();
					if (hasStatusesChanged(previousStatusMapRef.current, newStatuses)) {
						setStatusMap(newStatuses);
						previousStatusMapRef.current = newStatuses;

						// If all events are now terminal, stop polling
						const allTerminal = Array.from(newStatuses.values()).every(
							(status) =>
								status === ComplexEventStatus.archived ||
								status === ComplexEventStatus.canceled
						);
						if (allTerminal) {
							clearExistingInterval();
						}
					}
				}, config.pokeInterval * 1000);
			}
		}

		return clearExistingInterval;
	}, [events, config.withPoke, config.pokeInterval]);

	return { statusMap };
};

export default useComplexEventStatuses;
