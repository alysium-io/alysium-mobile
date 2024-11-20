import dayjs from 'dayjs';
import { useState } from 'react';

type DurationOption = {
	id: string;
	label: string;
	minutes: number | null;
};

type DefaultSettings = {
	startDateTime?: Date | null;
	endDateTime?: Date | null;
};

type UseEventTimingReturn = {
	startDateTime: Date;
	endDateTime: Date | null;
	currentDuration: number | null;
	selectedDurationOption: DurationOption;
	durationOptions: DurationOption[];
	setStartDateTime: (date: Date) => void;
	setEndDateTime: (date: Date) => void;
	setSelectedDurationOption: (optionId: string) => void;
	startMinimumDate: Date;
	endMinimumDate: Date;
	datePickerOptions: {
		date: Date;
		minimumDate: Date;
		onDateChange: (date: Date) => void;
	};
	isEditingStartOrEnd: 'start' | 'end';
	setIsEditingStartOrEnd: (mode: 'start' | 'end') => void;
};

const roundToNearest15Minutes = (date: dayjs.Dayjs): dayjs.Dayjs => {
	const minutes = date.minute();
	const remainder = minutes % 15;
	const roundedMinutes =
		remainder < 8 ? minutes - remainder : minutes + (15 - remainder);
	return date.minute(roundedMinutes).second(0).millisecond(0);
};

const getStartMinimumDate = (): dayjs.Dayjs => {
	const now = dayjs();
	const rounded = roundToNearest15Minutes(now);
	return rounded.isBefore(now) ? rounded.add(15, 'minutes') : rounded;
};

const getInitialDurationOption = (
	startDate: dayjs.Dayjs,
	endDate: dayjs.Dayjs | null
): string => {
	if (!endDate) return 'none';

	const durationInMinutes = endDate.diff(startDate, 'minute');
	if (durationInMinutes === 60) return '1hr';
	if (durationInMinutes === 120) return '2hrs';
	return 'custom';
};

export const useEventTiming = (
	defaultSettings: DefaultSettings = {}
): UseEventTimingReturn => {
	const minimumStartTime = getStartMinimumDate();
	const initialStartTime = defaultSettings.startDateTime
		? roundToNearest15Minutes(dayjs(defaultSettings.startDateTime))
		: minimumStartTime;

	const initialEndTime = defaultSettings.endDateTime
		? roundToNearest15Minutes(dayjs(defaultSettings.endDateTime))
		: null;

	// Define duration options
	const durationOptions: DurationOption[] = [
		{ id: 'none', label: 'None', minutes: null },
		{ id: '1hr', label: '1 hour', minutes: 60 },
		{ id: '2hrs', label: '2 hours', minutes: 120 },
		{ id: 'custom', label: 'Custom', minutes: 60 }
	];

	// Initialize states with dayjs internally
	const [startDateTimeInternal, setStartDateTimeInternal] =
		useState(initialStartTime);
	const [endDateTimeInternal, setEndDateTimeInternal] =
		useState<dayjs.Dayjs | null>(initialEndTime);
	const [selectedDurationOption, setSelectedDurationOption] = useState(
		getInitialDurationOption(initialStartTime, initialEndTime)
	);
	const [currentDuration, setCurrentDuration] = useState<number | null>(
		initialEndTime ? initialEndTime.diff(initialStartTime, 'minute') : null
	);
	const [isEditingStartOrEnd, setIsEditingStartOrEnd] = useState<
		'start' | 'end'
	>('start');

	// Helper to safely set start date time
	const setStartDateTime = (newStartDate: Date) => {
		const roundedStartDate = roundToNearest15Minutes(dayjs(newStartDate));

		if (selectedDurationOption === 'none') {
			setStartDateTimeInternal(roundedStartDate);
		} else if (selectedDurationOption === 'custom') {
			// If custom and new start is after end, reset to 1 hour duration
			if (
				endDateTimeInternal &&
				roundedStartDate.isAfter(endDateTimeInternal)
			) {
				setStartDateTimeInternal(roundedStartDate);
				setEndDateTimeInternal(roundedStartDate.add(1, 'hour'));
				setCurrentDuration(60);
			} else {
				// Update start time and recalculate current duration
				setStartDateTimeInternal(roundedStartDate);
				if (endDateTimeInternal) {
					const newDuration = endDateTimeInternal.diff(
						roundedStartDate,
						'minute'
					);
					setCurrentDuration(newDuration);
				}
			}
		} else {
			// For fixed duration options, maintain the selected duration
			setStartDateTimeInternal(roundedStartDate);
			const option = durationOptions.find(
				(opt) => opt.id === selectedDurationOption
			);
			if (option?.minutes) {
				setEndDateTimeInternal(roundedStartDate.add(option.minutes, 'minute'));
			}
		}
	};

	// Helper to safely set end date time
	const setEndDateTime = (newEndDate: Date) => {
		const roundedEndDate = roundToNearest15Minutes(dayjs(newEndDate));

		if (selectedDurationOption === 'none') {
			setSelectedDurationOption('custom');
			setEndDateTimeInternal(roundedEndDate);
			setCurrentDuration(roundedEndDate.diff(startDateTimeInternal, 'minute'));
		} else {
			if (selectedDurationOption !== 'custom') {
				setSelectedDurationOption('custom');
			}

			if (roundedEndDate.isBefore(startDateTimeInternal)) {
				// If end is before start, set to 1 hour duration while maintaining custom mode
				setEndDateTimeInternal(startDateTimeInternal.add(1, 'hour'));
				setCurrentDuration(60);
			} else {
				setEndDateTimeInternal(roundedEndDate);
				setCurrentDuration(
					roundedEndDate.diff(startDateTimeInternal, 'minute')
				);
			}
		}
	};

	// Handle duration option changes
	const handleDurationOptionChange = (optionId: string) => {
		const option = durationOptions.find((opt) => opt.id === optionId);
		if (!option) return;

		setSelectedDurationOption(optionId);
		setIsEditingStartOrEnd(optionId === 'custom' ? 'end' : 'start');

		if (optionId === 'none') {
			setEndDateTimeInternal(null);
			setCurrentDuration(null);
		} else if (optionId === 'custom') {
			// Switching to custom from none should set a default 1 hour duration
			if (selectedDurationOption === 'none') {
				setEndDateTimeInternal(startDateTimeInternal.add(1, 'hour'));
				setCurrentDuration(60);
			} else {
				// Switching to custom maintains current duration
				const newDuration = endDateTimeInternal
					? endDateTimeInternal.diff(startDateTimeInternal, 'minute')
					: 60;
				setCurrentDuration(newDuration);
			}
		} else {
			// Switching to fixed duration updates end time
			setEndDateTimeInternal(
				startDateTimeInternal.add(option.minutes!, 'minute')
			);
			setCurrentDuration(option.minutes!);
		}
	};

	const currentDurationOption =
		durationOptions.find((opt) => opt.id === selectedDurationOption) ??
		durationOptions[0];

	// Calculate minimum dates
	const startMinimumDateTime = getStartMinimumDate();
	const endMinimumDateTime = startDateTimeInternal.add(1, 'hour');

	const datePickerOptions = {
		date:
			isEditingStartOrEnd === 'start'
				? startDateTimeInternal.toDate()
				: endDateTimeInternal?.toDate() ??
				  startDateTimeInternal.add(1, 'hour').toDate(),
		minimumDate:
			isEditingStartOrEnd === 'start'
				? startMinimumDateTime.toDate()
				: endMinimumDateTime.toDate(),
		onDateChange:
			isEditingStartOrEnd === 'start' ? setStartDateTime : setEndDateTime
	};

	return {
		startDateTime: startDateTimeInternal.toDate(),
		endDateTime: endDateTimeInternal?.toDate() ?? null,
		currentDuration,
		selectedDurationOption: currentDurationOption,
		durationOptions,
		setStartDateTime,
		setEndDateTime,
		setSelectedDurationOption: handleDurationOptionChange,
		startMinimumDate: startMinimumDateTime.toDate(),
		endMinimumDate: endMinimumDateTime.toDate(),
		datePickerOptions,
		isEditingStartOrEnd,
		setIsEditingStartOrEnd
	};
};
