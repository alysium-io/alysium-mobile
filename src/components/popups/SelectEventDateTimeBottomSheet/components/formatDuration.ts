import day from 'dayjs';
import duration from 'dayjs/plugin/duration';

day.extend(duration);

type Resolution =
	| 'year'
	| 'month'
	| 'week'
	| 'day'
	| 'hour'
	| 'minute'
	| 'second';

export function formatDuration(
	start: Date,
	end: Date,
	resolution: Resolution = 'second'
): string {
	const duration = day.duration(day(end).diff(day(start)));
	const units: Resolution[] = [
		'year',
		'month',
		'week',
		'day',
		'hour',
		'minute',
		'second'
	];
	const resolutionIndex = units.indexOf(resolution);
	const parts: string[] = [];

	const values = {
		year: Math.floor(duration.asYears()),
		month: duration.months(),
		week: Math.floor(duration.asWeeks() % 4),
		day: duration.days() % 7,
		hour: duration.hours(),
		minute: duration.minutes(),
		second: duration.seconds()
	};

	for (let i = 0; i <= resolutionIndex; i++) {
		const unit = units[i];
		const value = values[unit];

		if (value > 0 || (parts.length === 0 && i === resolutionIndex)) {
			parts.push(`${value} ${unit}${value === 1 ? '' : 's'}`);
		}
	}

	return parts.join(', ');
}
