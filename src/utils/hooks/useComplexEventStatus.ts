import { Event } from '@flux/api/event';
import { ComplexEventStatus, EventStatus } from '@flux/api/event/types';
import { useEffect, useRef, useState } from 'react';
import useEvent from './useEvent';

interface ComplexEventStatusConfig {
	withPoke?: boolean;
	pokeInterval?: number;
}

interface ComplexEventStatusApi {
	status?: EventStatus | null;
	complexStatus?: ComplexEventStatus | null;
	semanticStatus?: string | null;
}

const defaultConfig: Required<ComplexEventStatusConfig> = {
	withPoke: true,
	pokeInterval: 5
};

const semanticStatusMap: Record<ComplexEventStatus, string> = {
	[ComplexEventStatus.draft]: 'Draft',
	[ComplexEventStatus.coming_up]: 'Coming Up',
	[ComplexEventStatus.live]: 'Live',
	[ComplexEventStatus.archived]: 'Archived',
	[ComplexEventStatus.canceled]: 'Canceled',
	[ComplexEventStatus.published]: 'Published'
};

const useComplexEventStatus = (
	event?: Event,
	userConfig: ComplexEventStatusConfig = {}
): ComplexEventStatusApi => {
	const config = { ...defaultConfig, ...userConfig };
	const [complexStatus, setComplexStatus] = useState<ComplexEventStatus | null>(
		null
	);
	const previousStatusRef = useRef<ComplexEventStatus | null>(null);
	const intervalIdRef = useRef<NodeJS.Timeout>();
	const { calculateComplexStatus } = useEvent();

	useEffect(() => {
		const clearExistingInterval = () => {
			if (intervalIdRef.current) clearInterval(intervalIdRef.current);
		};

		const initialStatus = calculateComplexStatus(event);
		if (initialStatus !== previousStatusRef.current) {
			setComplexStatus(initialStatus);
			previousStatusRef.current = initialStatus;
		}

		if (
			config.withPoke &&
			initialStatus &&
			![ComplexEventStatus.archived, ComplexEventStatus.canceled].includes(
				initialStatus
			)
		) {
			intervalIdRef.current = setInterval(() => {
				const newStatus = calculateComplexStatus(event);
				if (newStatus !== previousStatusRef.current) {
					setComplexStatus(newStatus);
					previousStatusRef.current = newStatus;
					if (newStatus === ComplexEventStatus.archived)
						clearExistingInterval();
				}
			}, config.pokeInterval * 1000);
		}

		return clearExistingInterval;
	}, [event, config.withPoke, config.pokeInterval]);

	return {
		status: event?.status,
		complexStatus,
		semanticStatus: complexStatus ? semanticStatusMap[complexStatus] : null
	};
};

export default useComplexEventStatus;
