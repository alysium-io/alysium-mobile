export interface IUseDate {
	semantic: (date: Date) => SemanticDateExpression;
}
type SemanticDateExpression =
	| 'today'
	| 'tomorrow'
	| 'yesterday'
	| `this ${string}`
	| `next ${string}`
	| `in ${number} days`
	| '';

/**
 * Hook that provides semantic date formatting functionality
 * @returns Object containing semantic date formatting function
 */
const useDate = () => {
	const semantic = (
		date: Date | string | null | undefined
	): SemanticDateExpression => {
		// Handle null or undefined
		if (date == null) {
			return '';
		}

		// Convert to Date object if string
		const dateObject = date instanceof Date ? date : new Date(date);

		// Validate date object
		if (isNaN(dateObject.getTime())) {
			throw new Error('Invalid date provided');
		}

		const now = new Date();

		// Reset hours to start of day for consistent day comparisons
		const startOfToday = new Date(
			now.getFullYear(),
			now.getMonth(),
			now.getDate()
		);
		const targetDate = new Date(
			dateObject.getFullYear(),
			dateObject.getMonth(),
			dateObject.getDate()
		);

		// Calculate days difference
		const diffTime = targetDate.getTime() - startOfToday.getTime();
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

		// Handle special cases
		if (diffDays === 0) return 'today';
		if (diffDays === 1) return 'tomorrow';
		if (diffDays === -1) return 'yesterday';

		// Define day names
		const days = [
			'Sunday',
			'Monday',
			'Tuesday',
			'Wednesday',
			'Thursday',
			'Friday',
			'Saturday'
		] as const;
		type DayOfWeek = (typeof days)[number];

		const targetDay: DayOfWeek = days[targetDate.getDay()];

		// Handle this week and next week
		const currentDay = now.getDay();
		const daysUntilEndOfWeek = 6 - currentDay;

		if (diffDays <= daysUntilEndOfWeek && diffDays > 0) {
			return `this ${targetDay}` as const;
		}

		if (diffDays > daysUntilEndOfWeek && diffDays <= daysUntilEndOfWeek + 7) {
			return `next ${targetDay}` as const;
		}

		if (diffDays > 0 && diffDays <= 7) {
			return `in ${diffDays} days` as const;
		}

		// Return empty string for dates outside our range
		return '';
	};

	return { semantic };
};

export default useDate;
