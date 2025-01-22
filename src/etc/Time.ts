import { dayjs } from '@etc';

class Time {
	static getDuration(startTime: dayjs.Dayjs, endTime: dayjs.Dayjs) {
		const diffDuration = dayjs.duration(endTime.diff(startTime));

		// Format the duration as requested
		let formattedDuration = '';
		if (diffDuration.hours() > 0) {
			formattedDuration += `${diffDuration.hours()}hr `;
		}
		if (diffDuration.minutes() > 0) {
			formattedDuration += `${diffDuration.minutes()}min`;
		}

		// Trim any extra space at the end
		formattedDuration = formattedDuration.trim();

		return formattedDuration;
	}
}

export default Time;
