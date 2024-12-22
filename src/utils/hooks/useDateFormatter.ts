import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import relativeTime from 'dayjs/plugin/relativeTime';
import weekday from 'dayjs/plugin/weekday';
import weekOfYear from 'dayjs/plugin/weekOfYear';

// Initialize dayjs plugins
dayjs.extend(relativeTime);
dayjs.extend(isSameOrBefore);
dayjs.extend(weekday);
dayjs.extend(isBetween);
dayjs.extend(weekOfYear);

type DateInput = Date | dayjs.Dayjs | string | null | undefined;

interface DateFormatterReturn {
	hasValidDate: boolean;
	getSemanticTimeUntil: () => string | null;
	formattedDate: string | null;
	formattedTime: string | null;
}

const useDateFormatter = (date: DateInput): DateFormatterReturn => {
	const normalizedDate = date
		? dayjs(date).isValid()
			? dayjs(date)
			: null
		: null;
	const hasValidDate = normalizedDate !== null;

	/**
	 * Returns a semantic representation of the time until the event
	 * @returns {string | null} Semantic time string or null if date is invalid/past
	 * @example
	 * // Returns "Today" for same day
	 * // Returns "Tomorrow" for next day
	 * // Returns "This Thursday" for this week's Thursday
	 * // Returns "Next Friday" for next week's Friday
	 * // Returns "In 2 weeks" for dates ~2 weeks away
	 * // Returns "In 3 months" for dates ~3 months away
	 * // Returns "In 2 years" for dates ~2 years away
	 */
	const getSemanticTimeUntil = (): string | null => {
		if (!normalizedDate || normalizedDate.isBefore(dayjs(), 'day')) {
			return null;
		}

		const now = dayjs();
		const diffDays = normalizedDate.diff(now, 'day');
		const diffWeeks = normalizedDate.diff(now, 'week');
		const diffMonths = normalizedDate.diff(now, 'month');
		const diffYears = normalizedDate.diff(now, 'year');

		// Same or next day
		if (diffDays === 0) return 'Today';
		if (diffDays === 1) return 'Tomorrow';

		// Within this week or next week
		if (diffDays < 14) {
			const dayName = normalizedDate.format('dddd');
			if (normalizedDate.week() === now.week()) {
				return `This ${dayName}`;
			}
			if (normalizedDate.week() === now.add(1, 'week').week()) {
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

	return {
		hasValidDate,
		getSemanticTimeUntil,
		formattedDate: dayjs(normalizedDate).format('ddd. MMM D'),
		formattedTime: dayjs(normalizedDate).format('h:mma')
	};
};

export default useDateFormatter;
