import { Event } from '@flux/api/event';
import { ComplexEventStatus, EventStatus } from '@flux/api/event/types';
import dayjs from 'dayjs';

interface IUseEvent {
	calculateComplexStatus: (event?: Event) => ComplexEventStatus | null;
}

const useEvent = (): IUseEvent => {
	const calculateComplexStatus = (event?: Event): ComplexEventStatus | null => {
		if (!event) return null;

		if (event.status === EventStatus.draft) {
			return ComplexEventStatus.draft;
		}

		if (event.status === EventStatus.published) {
			if (event.start_time === null) {
				throw new Error(
					'Event start time cannot be null when status is published'
				);
			}

			const startTime = dayjs(event.start_time);
			const currentTime = dayjs();
			const endTime =
				event.end_time === null
					? dayjs(event.start_time).hour(23).minute(59).second(59)
					: dayjs(event.end_time);

			if (currentTime.isBefore(startTime)) {
				return ComplexEventStatus.coming_up;
			}

			if (currentTime.isAfter(startTime) && currentTime.isBefore(endTime)) {
				return ComplexEventStatus.live;
			}

			return ComplexEventStatus.archived;
		}

		return ComplexEventStatus.canceled;
	};

	return {
		calculateComplexStatus
	};
};

export default useEvent;
