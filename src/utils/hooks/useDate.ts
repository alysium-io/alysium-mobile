export interface IUseDate {
	semantic: (date: Date | string | null | undefined) => SemanticDateExpression;
}

type SemanticDateExpression =
	| `Tomorrow, ${string}`
	| `This ${string}, ${string}`
	| `Next ${string}, ${string}`
	| `In ${number} days, ${string}`
	| `Today, ${string}`
	| '';

/**
 * Hook that provides semantic date formatting functionality
 * @returns Object containing semantic date formatting function
 */
const useDate = () => {
	const formatTime = (date: Date): string => {
		let hours = date.getHours();
		const minutes = date.getMinutes();
		const ampm = hours >= 12 ? 'pm' : 'am';

		// Convert to 12 hour format
		hours = hours % 12;
		hours = hours ? hours : 12; // Handle midnight (0)

		// Add leading zero to minutes if needed
		const minutesStr = minutes < 10 ? `0${minutes}` : minutes;

		return `${hours}:${minutesStr}${ampm}`;
	};

	const semantic = (
		date: Date | string | null | undefined
	): SemanticDateExpression => {
		// Handle null or undefined
		if (date == null) {
			return '';
		}

		// Handle "today" string specifically
		if (typeof date === 'string' && date.toLowerCase() === 'today') {
			return `Today, ${formatTime(new Date())}` as const;
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
		if (diffDays === 0) {
			return `Today, ${formatTime(dateObject)}` as const;
		}
		if (diffDays === 1) {
			return `Tomorrow, ${formatTime(dateObject)}` as const;
		}
		// Return empty string for past dates
		if (diffDays < 0) {
			return '';
		}

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
		const formattedTime = formatTime(dateObject);

		// Handle this week and next week
		const currentDay = now.getDay();
		const daysUntilEndOfWeek = 6 - currentDay;

		if (diffDays <= daysUntilEndOfWeek && diffDays > 0) {
			return `This ${targetDay}, ${formattedTime}` as const;
		}

		if (diffDays > daysUntilEndOfWeek && diffDays <= daysUntilEndOfWeek + 7) {
			return `Next ${targetDay}, ${formattedTime}` as const;
		}

		if (diffDays > 0 && diffDays <= 7) {
			return `In ${diffDays} days, ${formattedTime}` as const;
		}

		// Return empty string for dates outside our range
		return '';
	};

	return { semantic };
};

export default useDate;
