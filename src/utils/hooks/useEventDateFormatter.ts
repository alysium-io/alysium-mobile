import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import relativeTime from 'dayjs/plugin/relativeTime';
import weekday from 'dayjs/plugin/weekday';
import weekOfYear from 'dayjs/plugin/weekOfYear';

// Initialize dayjs plugins
dayjs.extend(duration);
dayjs.extend(relativeTime);
dayjs.extend(isSameOrBefore);
dayjs.extend(weekday);
dayjs.extend(isBetween);
dayjs.extend(weekOfYear);

type DateInput = Date | dayjs.Dayjs | string | null | undefined;

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

		// Same or next day
		if (diffDays === 0) return 'Today';
		if (diffDays === 1) return 'Tomorrow';

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

		const diffMinutes = now.diff(normalizedStartDate, 'minute');
		const diffHours = now.diff(normalizedStartDate, 'hour');
		const diffDays = now.diff(normalizedStartDate, 'day');
		const diffWeeks = Math.floor(diffDays / 7);
		const diffMonths = now.diff(normalizedStartDate, 'month');
		const diffYears = now.diff(normalizedStartDate, 'year');

		// Just now / minutes
		if (diffMinutes < 1) {
			return 'Just now';
		}
		if (diffMinutes < 60) {
			return `${diffMinutes} minute${diffMinutes === 1 ? '' : 's'} ago`;
		}

		// Hours
		if (diffHours < 24) {
			return `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`;
		}

		// Days
		if (diffDays < 7) {
			return `${diffDays} day${diffDays === 1 ? '' : 's'} ago`;
		}

		// Weeks
		if (diffWeeks < 4 && diffWeeks > 0) {
			return `${diffWeeks} week${diffWeeks === 1 ? '' : 's'} ago`;
		}

		// Months
		if (diffMonths < 12 && diffMonths > 0) {
			return `${diffMonths} month${diffMonths === 1 ? '' : 's'} ago`;
		}

		// Years
		if (diffYears > 0) {
			return `${diffYears} year${diffYears === 1 ? '' : 's'} ago`;
		}

		// Fallback to showing "1 month ago" if none of the above conditions match
		return '1 month ago';
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
		isToday
	};
};

export default useEventDateFormatter;
