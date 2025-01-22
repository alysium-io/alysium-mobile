import { dayjs } from '@etc';

type DateInput = Date | dayjs.Dayjs | string | null | undefined;
type TimeDisplay = {
	title: string;
	subtitle: string;
};

interface EventDateFormatterReturn {
	hasValidDate: boolean;
	hasEndDate: boolean;
	semantic: () => string | null;
	startDate: () => string | null;
	startTime: () => string | null;
	endDate: () => string | null;
	endTime: () => string | null;
	duration: () => string | null;
	timeAgoConcise: () => string | null;
	isInFuture: boolean;
	isInPast: boolean;
	isToday: boolean;
	getDisplayParts: () => TimeDisplay;
}

const useEventDateFormatter = (
	start_date: DateInput,
	end_date: DateInput = null
): EventDateFormatterReturn => {
	const normalizedStartDate = start_date
		? dayjs(start_date).isValid()
			? dayjs(start_date)
			: null
		: null;

	const normalizedEndDate = end_date
		? dayjs(end_date).isValid()
			? dayjs(end_date)
			: null
		: null;

	const hasValidDate = normalizedStartDate !== null;
	const hasEndDate = normalizedEndDate !== null;
	const isInFuture = hasValidDate && normalizedStartDate!.isAfter(dayjs());
	const isInPast = hasValidDate && normalizedStartDate!.isBefore(dayjs());
	const isToday = hasValidDate && normalizedStartDate!.isSame(dayjs(), 'day');

	const semantic = (): string | null => {
		if (!normalizedStartDate || normalizedStartDate.isBefore(dayjs(), 'day')) {
			return null;
		}

		const now = dayjs();
		const diffDays = normalizedStartDate.diff(now, 'day');
		const diffWeeks = normalizedStartDate.diff(now, 'week');
		const diffMonths = normalizedStartDate.diff(now, 'month');
		const diffYears = normalizedStartDate.diff(now, 'year');

		// Same or next day - Check if it's actually the same calendar day
		if (normalizedStartDate.isSame(now, 'day')) return 'Today';
		if (normalizedStartDate.isSame(now.add(1, 'day'), 'day')) return 'Tomorrow';

		// Within this week or next week
		if (diffDays < 14) {
			const dayName = normalizedStartDate.format('dddd');
			if (normalizedStartDate.week() === now.week()) {
				return `This ${dayName}`;
			}
			if (normalizedStartDate.week() === now.add(1, 'week').week()) {
				return `Next ${dayName}`;
			}
		}

		// Weeks
		if (diffWeeks < 8) {
			return `In ${diffWeeks} ${diffWeeks === 1 ? 'week' : 'weeks'}`;
		}

		// Months
		if (diffMonths < 24) {
			return `In ${diffMonths} ${diffMonths === 1 ? 'month' : 'months'}`;
		}

		// Years
		return `In ${diffYears} ${diffYears === 1 ? 'year' : 'years'}`;
	};

	const startDate = (): string | null => {
		if (!normalizedStartDate) return null;
		return normalizedStartDate.format('ddd. MMM D');
	};

	const startTime = (): string | null => {
		if (!normalizedStartDate) return null;
		return normalizedStartDate.format('h:mma');
	};

	const endDate = (): string | null => {
		if (!normalizedEndDate) return null;
		return normalizedEndDate.format('ddd. MMM D');
	};

	const endTime = (): string | null => {
		if (!normalizedEndDate) return null;
		return normalizedEndDate.format('h:mma');
	};

	const duration = (): string | null => {
		if (!normalizedStartDate || !normalizedEndDate) return null;

		const diff = normalizedEndDate.diff(normalizedStartDate, 'minute');
		const dur = dayjs.duration(diff, 'minute');

		const days = Math.floor(dur.asDays());
		const hours = dur.hours();
		const minutes = dur.minutes();

		const parts: string[] = [];

		if (days > 0) parts.push(`${days}d`);
		if (hours > 0) parts.push(`${hours}h`);
		if (minutes > 0) parts.push(`${minutes}m`);

		// If no duration parts (i.e., dates are the same), return 0m
		if (parts.length === 0) return '0m';

		return parts.join(', ');
	};

	const timeAgoConcise = (): string | null => {
		if (!normalizedStartDate) return null;
		const now = dayjs();
		if (normalizedStartDate.isAfter(now)) return null;

		return normalizedStartDate.fromNow();
	};

	const getDisplayParts = (): TimeDisplay => {
		// If no valid date, return default
		if (!hasValidDate) {
			return { title: 'No Date', subtitle: '' };
		}

		// Get the semantic phrase if available (for future dates)
		const semanticPhrase = semantic();
		const startTimeStr = startTime();

		// Case 1: Semantic phrase available (future dates)
		if (semanticPhrase) {
			return {
				title: startTimeStr
					? `${semanticPhrase}, ${startTimeStr}`
					: semanticPhrase,
				subtitle: startDate() || ''
			};
		}

		// Case 2: Past dates use timeAgoConcise
		const timeAgo = timeAgoConcise();
		if (timeAgo) {
			return {
				title: timeAgo,
				subtitle: startDate() || ''
			};
		}

		// Case 3: Something is wrong with the date
		return { title: 'No Date', subtitle: '' };
	};

	return {
		hasValidDate,
		hasEndDate,
		semantic,
		startDate,
		startTime,
		endDate,
		endTime,
		duration,
		timeAgoConcise,
		isInFuture,
		isInPast,
		isToday,
		getDisplayParts
	};
};

export default useEventDateFormatter;
