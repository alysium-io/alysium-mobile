import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useRef, useState } from 'react';

type DayPart =
	| 'Today'
	| 'Tomorrow'
	| `This ${string}`
	| `Next ${string}`
	| `In ${number} days`;

type TimeFormat =
	| 'h:mma' // 3:30pm
	| 'h:mm a' // 3:30 pm
	| 'HH:mm' // 15:30
	| 'hh:mm a' // 03:30 pm
	| 'h:mm' // 3:30
	| 'HH:mm:ss'; // 15:30:45

type DateComponentType =
	| 'semanticDay' // Uses semantic day expression
	| 'year' // 2024
	| 'month' // January, Jan
	| 'day' // 1-31
	| 'weekday' // Monday, Mon
	| 'time' // Based on format
	| 'meridiem'; // AM/PM

type TimeUnit = 'years' | 'months' | 'days' | 'hours' | 'minutes' | 'seconds';
type TimeDepth = TimeUnit;

interface FormatSpecification {
	type: DateComponentType;
	format?: {
		time?: TimeFormat;
		month?: 'long' | 'short' | 'numeric';
		weekday?: 'long' | 'short';
	};
	nameLength?: 'long' | 'short';
	delimiter?: string;
	fallback?: string;
}

interface TimeDifference {
	years: number;
	months: number;
	days: number;
	hours: number;
	minutes: number;
	seconds: number;
}

interface DateBuilderApi {
	build: {
		(formatSpecs: FormatSpecification[]): string;
		(formatSpec: FormatSpecification): string;
		(type: DateComponentType): string;
	};
	date: Dayjs;
	setDate: (date: Date | Dayjs | string) => void;
	ticker: (depth: TimeDepth) => string | null;
}

const TIME_UNIT_ORDER: TimeUnit[] = [
	'years',
	'months',
	'days',
	'hours',
	'minutes',
	'seconds'
];

export const useDateBuilder = (
	initialDate: Date | Dayjs | string | null = new Date()
): DateBuilderApi => {
	const [date, setDateState] = useState<Dayjs>(() =>
		initialDate ? dayjs(initialDate) : dayjs()
	);
	const [tickerValue, setTickerValue] = useState<TimeDifference | null>(null);

	// Use ref to compare dates for meaningful changes
	const dateRef = useRef<string>(date.toISOString());

	const getSemanticDay = (): DayPart => {
		const now = dayjs();
		const startOfToday = now.startOf('day');
		const targetDate = date.startOf('day');
		const diffDays = targetDate.diff(startOfToday, 'day');
		const days = [
			'Sunday',
			'Monday',
			'Tuesday',
			'Wednesday',
			'Thursday',
			'Friday',
			'Saturday'
		];

		if (diffDays === 0) return 'Today';
		if (diffDays === 1) return 'Tomorrow';

		const currentDay = now.day();
		const daysUntilEndOfWeek = 6 - currentDay;

		if (diffDays <= daysUntilEndOfWeek && diffDays > 0) {
			return `This ${days[date.day()]}`;
		}

		if (diffDays > daysUntilEndOfWeek && diffDays <= daysUntilEndOfWeek + 7) {
			return `Next ${days[date.day()]}`;
		}

		if (diffDays > 0 && diffDays <= 7) {
			return `In ${diffDays} days`;
		}

		return `In ${diffDays} days`;
	};

	const buildComponent = (
		spec: FormatSpecification,
		isSingleSpec: boolean
	): string => {
		// If it's a single spec, default to empty string, otherwise default to ', '
		const delimiter = spec.delimiter ?? (isSingleSpec ? '' : ', ');

		switch (spec.type) {
			case 'semanticDay':
				return getSemanticDay() + delimiter;

			case 'year':
				return date.year() + delimiter;

			case 'month':
				const monthFormat = spec.format?.month || 'long';
				switch (monthFormat) {
					case 'long':
						return date.format('MMMM') + delimiter;
					case 'short':
						return date.format('MMM') + delimiter;
					case 'numeric':
						return date.format('MM') + delimiter;
				}

			case 'day':
				return date.date() + delimiter;

			case 'weekday':
				const weekdayFormat = spec.format?.weekday || 'long';
				return (
					date.format(weekdayFormat === 'long' ? 'dddd' : 'ddd') + delimiter
				);

			case 'time':
				const timeFormat = spec.format?.time || 'h:mma';
				return date.format(timeFormat) + delimiter;

			case 'meridiem':
				return date.format('A') + delimiter;

			default:
				return spec.fallback || '';
		}
	};

	const buildDate = (specs: FormatSpecification[]): string => {
		const isSingleSpec = specs.length === 1;
		return specs
			.map((spec) => buildComponent(spec, isSingleSpec))
			.join('')
			.trim();
	};

	const build = ((
		param: FormatSpecification[] | FormatSpecification | DateComponentType
	): string => {
		if (typeof param === 'string') {
			return buildDate([{ type: param }]);
		} else if (Array.isArray(param)) {
			return buildDate(param);
		} else {
			return buildDate([param]);
		}
	}) as DateBuilderApi['build'];

	const calculateTimeDifference = (): TimeDifference | null => {
		const now = dayjs();
		if (date.isBefore(now)) return null;

		let remaining = date.diff(now, 'second');

		const years = Math.floor(remaining / (365 * 24 * 60 * 60));
		remaining -= years * 365 * 24 * 60 * 60;

		const months = Math.floor(remaining / (30 * 24 * 60 * 60));
		remaining -= months * 30 * 24 * 60 * 60;

		const days = Math.floor(remaining / (24 * 60 * 60));
		remaining -= days * 24 * 60 * 60;

		const hours = Math.floor(remaining / (60 * 60));
		remaining -= hours * 60 * 60;

		const minutes = Math.floor(remaining / 60);
		remaining -= minutes * 60;

		const seconds = remaining;

		return {
			years,
			months,
			days,
			hours,
			minutes,
			seconds
		};
	};

	const formatTimeUnit = (value: number, unit: TimeUnit): string => {
		if (value === 0) return '';
		return `${value} ${value === 1 ? unit.slice(0, -1) : unit}`;
	};

	const ticker = (depth: TimeDepth): string | null => {
		if (!tickerValue) return null;

		// Find the index of the requested depth
		const depthIndex = TIME_UNIT_ORDER.indexOf(depth);
		if (depthIndex === -1) return null;

		// Get all units from the start up to and including the depth
		const relevantUnits = TIME_UNIT_ORDER.slice(0, depthIndex + 1);

		// Find the first non-zero value
		const firstNonZeroIndex = relevantUnits.findIndex(
			(unit) => tickerValue[unit] > 0
		);

		if (firstNonZeroIndex === -1) {
			// If we're showing seconds and everything is 0, show "0 seconds"
			if (depth === 'seconds') return '0 seconds';
			return null;
		}

		// Get all units from first non-zero to depth
		const activeUnits = relevantUnits.slice(firstNonZeroIndex);

		const parts = activeUnits
			.map((unit) => formatTimeUnit(tickerValue[unit], unit))
			.filter(Boolean);

		if (parts.length === 0) return null;
		if (parts.length === 1) return parts[0];

		const lastPart = parts.pop();
		return `${parts.join(', ')}${parts.length ? ' and ' : ''}${lastPart}`;
	};

	useEffect(() => {
		const newDateString = dayjs(date).toISOString();
		if (dateRef.current !== newDateString) {
			dateRef.current = newDateString;
			setDateState(dayjs(date));
		}
	}, [date]);

	useEffect(() => {
		const updateTicker = () => {
			setTickerValue(calculateTimeDifference());
		};

		// Initial calculation
		updateTicker();

		// Set up interval for updates
		const interval = setInterval(updateTicker, 1000);

		return () => clearInterval(interval);
	}, [dateRef.current]); // Only update when the date reference changes

	const setDate = (newDate: Date | Dayjs | string) => {
		const newDateString = dayjs(newDate).toISOString();
		if (dateRef.current !== newDateString) {
			dateRef.current = newDateString;
			setDateState(dayjs(newDate));
		}
	};

	return {
		build,
		date,
		setDate,
		ticker
	};
};

export default useDateBuilder;
