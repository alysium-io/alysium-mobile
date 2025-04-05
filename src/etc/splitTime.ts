export interface SplitTime {
	hours: number;
	minutes: number;
	seconds: number;
}

export const splitTime = (totalSeconds: number): SplitTime => {
	const hours = Math.floor(totalSeconds / 3600);
	const minutes = Math.floor((totalSeconds % 3600) / 60);
	const seconds = Math.floor(totalSeconds % 60);

	return {
		hours,
		minutes,
		seconds
	};
};

export const formatSplitTime = (totalSeconds: number): string => {
	const time = splitTime(totalSeconds);
	var formattedTime = [];
	if (time.hours > 0) {
		formattedTime.push(`${time.hours}hr`);
	}
	if (time.minutes > 0) {
		formattedTime.push(`${time.minutes}min`);
	}
	if (time.seconds > 0) {
		formattedTime.push(`${time.seconds}s`);
	}
	return formattedTime.join(' ');
};
