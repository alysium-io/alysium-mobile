import { dayjs } from '@etc';
import { Event } from '@flux/api/event';
import { ComplexEventStatus, EventStatus } from '@flux/api/event/types';

interface IUseEvent {
	_isDraft: (overrideEvent?: Event) => boolean | undefined;
	isDraft: boolean | undefined;
	_isCanceled: (overrideEvent?: Event) => boolean | undefined;
	isCanceled: boolean | undefined;
	_isPublished: (overrideEvent?: Event) => boolean | undefined;
	isPublished: boolean | undefined;
	_isCompleted: (overrideEvent?: Event) => boolean | undefined;
	isCompleted: boolean | undefined;
	_isComingUp: (overrideEvent?: Event) => boolean | undefined;
	isComingUp: boolean | undefined;
	_isEnded: (overrideEvent?: Event) => boolean | undefined;
	isEnded: boolean | undefined;
	_isLive: (overrideEvent?: Event) => boolean | undefined;
	isLive: boolean | undefined;
	_isStartTimeValid: (overrideEvent?: Event) => boolean | undefined;
	isStartTimeValid: boolean | undefined;
	_isLocationValid: (overrideEvent?: Event) => boolean | undefined;
	isLocationValid: boolean | undefined;
	_isStartTimeInPast: (overrideEvent?: Event) => boolean | undefined;
	isStartTimeInPast: boolean | undefined;
	_isStartTimeInFuture: (overrideEvent?: Event) => boolean | undefined;
	isStartTimeInFuture: boolean | undefined;
	_getStartTimeReference: (overrideEvent?: Event) => dayjs.Dayjs | undefined;
	startTimeReference: dayjs.Dayjs | undefined;
	_getEndTimeReference: (overrideEvent?: Event) => dayjs.Dayjs | undefined;
	endTimeReference: dayjs.Dayjs | undefined;
	_getComplexStatus: (overrideEvent?: Event) => ComplexEventStatus | undefined;
	complexStatus: ComplexEventStatus | undefined;
	semanticComplexStatus: string | undefined;
	_getStatus: (overrideEvent?: Event) => EventStatus | undefined;
	status: EventStatus | undefined;
	semanticStatus: string | undefined;
	_isInPast: (overrideEvent?: Event) => boolean | undefined;
	isInPast: boolean | undefined;
}

const useEvent = (event?: Event): IUseEvent => {
	const _isDraft = (overrideEvent?: Event): boolean | undefined => {
		const targetEvent = overrideEvent ?? event;
		if (!targetEvent) return undefined;
		return targetEvent.status === EventStatus.draft;
	};

	const _isCanceled = (overrideEvent?: Event): boolean | undefined => {
		const targetEvent = overrideEvent ?? event;
		if (!targetEvent) return undefined;
		return targetEvent.status === EventStatus.canceled;
	};

	const _isPublished = (overrideEvent?: Event): boolean | undefined => {
		const targetEvent = overrideEvent ?? event;
		if (!targetEvent) return undefined;
		return targetEvent.status === EventStatus.published;
	};

	const _isCompleted = (overrideEvent?: Event): boolean | undefined => {
		const targetEvent = overrideEvent ?? event;
		if (!targetEvent) return undefined;
		return targetEvent.status === EventStatus.completed;
	};

	// Complex statuses
	const _isComingUp = (overrideEvent?: Event): boolean | undefined => {
		const targetEvent = overrideEvent ?? event;
		if (!targetEvent) return undefined;
		if (!_isPublished(targetEvent)) return false;
		const startTimeReference = _getStartTimeReference(targetEvent);
		if (!startTimeReference) return false;
		return startTimeReference.isAfter(dayjs());
	};

	const _isEnded = (overrideEvent?: Event): boolean | undefined => {
		const targetEvent = overrideEvent ?? event;
		if (!targetEvent) return undefined;
		if (!_isPublished(targetEvent)) return false;
		const endTimeReference = _getEndTimeReference(targetEvent);
		if (!endTimeReference) return false;
		return endTimeReference.isBefore(dayjs());
	};

	const _isLive = (overrideEvent?: Event): boolean | undefined => {
		const targetEvent = overrideEvent ?? event;
		if (!targetEvent) return undefined;
		if (!_isPublished(targetEvent)) return false;
		const startTimeReference = _getStartTimeReference(targetEvent);
		const endTimeReference = _getEndTimeReference(targetEvent);
		if (
			!startTimeReference ||
			!endTimeReference ||
			!startTimeReference.isValid() ||
			!endTimeReference.isValid()
		)
			return false; // needs a full window to be live
		return (
			startTimeReference.isBefore(dayjs()) && endTimeReference.isAfter(dayjs())
		);
	};

	const _getStartTimeReference = (
		overrideEvent?: Event
	): dayjs.Dayjs | undefined => {
		const targetEvent = overrideEvent ?? event;
		if (!targetEvent) return undefined;
		// Get the reference point for when the event is considered started.
		// If the event has a start time, we use that.
		if (dayjs(targetEvent.start_time).isValid()) {
			return dayjs(targetEvent.start_time);
		}
		return undefined;
	};

	const _getEndTimeReference = (
		overrideEvent?: Event
	): dayjs.Dayjs | undefined => {
		const targetEvent = overrideEvent ?? event;
		if (!targetEvent) return undefined;
		// This is the reference point for when the event is considered ended.
		// If the event has an end time, we use that.
		// Otherwise, we use the start time.
		if (dayjs(targetEvent.end_time).isValid()) {
			return dayjs(targetEvent.end_time);
		}
		if (dayjs(targetEvent.start_time).isValid()) {
			return dayjs(targetEvent.start_time);
		}
		return undefined;
	};

	const _isStartTimeValid = (overrideEvent?: Event): boolean | undefined => {
		const targetEvent = overrideEvent ?? event;
		if (!targetEvent) return undefined;
		// Start time must not be null and be a valid date
		return (
			targetEvent.start_time !== null && dayjs(targetEvent.start_time).isValid()
		);
	};

	const _isLocationValid = (overrideEvent?: Event): boolean | undefined => {
		const targetEvent = overrideEvent ?? event;
		if (!targetEvent) return undefined;
		return targetEvent.location !== null;
	};

	const _isStartTimeInPast = (overrideEvent?: Event): boolean | undefined => {
		const targetEvent = overrideEvent ?? event;
		if (!targetEvent) return undefined;
		const isValid = _isStartTimeValid(targetEvent);
		if (!isValid) return undefined;
		return dayjs(targetEvent.start_time).isBefore(dayjs());
	};

	const _isStartTimeInFuture = (overrideEvent?: Event): boolean | undefined => {
		const targetEvent = overrideEvent ?? event;
		if (!targetEvent) return undefined;
		const isValid = _isStartTimeValid(targetEvent);
		if (!isValid) return undefined;
		return dayjs(targetEvent.start_time).isAfter(dayjs());
	};

	const _getStatus = (overrideEvent?: Event): EventStatus | undefined => {
		const targetEvent = overrideEvent ?? event;
		if (!targetEvent) return undefined;
		return targetEvent.status;
	};

	const _getComplexStatus = (
		overrideEvent?: Event
	): ComplexEventStatus | undefined => {
		const targetEvent = overrideEvent ?? event;
		if (_isDraft(targetEvent)) return ComplexEventStatus.draft;
		if (_isCanceled(targetEvent)) return ComplexEventStatus.canceled;
		if (_isComingUp(targetEvent)) return ComplexEventStatus.coming_up;
		if (_isEnded(targetEvent)) return ComplexEventStatus.ended;
		if (_isLive(targetEvent)) return ComplexEventStatus.live;
		if (_isCompleted(targetEvent)) return ComplexEventStatus.completed;
		return undefined;
	};

	const _getSemanticComplexStatus = (): string | undefined => {
		if (!event) return undefined;
		switch (_getComplexStatus()) {
			case ComplexEventStatus.draft:
				return 'Draft';
			case ComplexEventStatus.canceled:
				return 'Canceled';
			case ComplexEventStatus.coming_up:
				return 'Coming Up';
			case ComplexEventStatus.ended:
				return 'Ended';
			case ComplexEventStatus.live:
				return 'Live';
			case ComplexEventStatus.completed:
				return 'Completed';
			default:
				return undefined;
		}
	};

	const _getSemanticStatus = (): string | undefined => {
		if (!event) return undefined;
		switch (_getStatus()) {
			case EventStatus.draft:
				return 'Draft';
			case EventStatus.canceled:
				return 'Canceled';
			case EventStatus.published:
				return 'Published';
			case EventStatus.completed:
				return 'Completed';
			default:
				return undefined;
		}
	};

	const _isInPast = (overrideEvent?: Event): boolean | undefined => {
		const targetEvent = overrideEvent ?? event;
		if (!targetEvent) return undefined;
		return dayjs(targetEvent.start_time).isBefore(dayjs());
	};

	return {
		_isDraft,
		isDraft: _isDraft(event),
		_isCanceled,
		isCanceled: _isCanceled(event),
		_isPublished,
		isPublished: _isPublished(event),
		_isCompleted,
		isCompleted: _isCompleted(event),
		_isComingUp,
		isComingUp: _isComingUp(event),
		_isEnded,
		isEnded: _isEnded(event),
		_isLive,
		isLive: _isLive(event),
		_isStartTimeValid,
		isStartTimeValid: _isStartTimeValid(event),
		_isLocationValid,
		isLocationValid: _isLocationValid(event),
		_isStartTimeInPast,
		isStartTimeInPast: _isStartTimeInPast(event),
		_isStartTimeInFuture,
		isStartTimeInFuture: _isStartTimeInFuture(event),
		_getStartTimeReference,
		startTimeReference: _getStartTimeReference(event),
		_getEndTimeReference,
		endTimeReference: _getEndTimeReference(event),
		_getComplexStatus,
		complexStatus: _getComplexStatus(event),
		semanticComplexStatus: _getSemanticComplexStatus(),
		_getStatus,
		status: _getStatus(event),
		semanticStatus: _getSemanticStatus(),
		_isInPast,
		isInPast: _isInPast(event)
	};
};

export default useEvent;
