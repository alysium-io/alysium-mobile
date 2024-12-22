import dayjs from 'dayjs';
import { useEffect, useRef, useState } from 'react';

interface CountdownConfig {
	pokeInterval?: number;
	hideZeroValues?: boolean;
	stopAtZero?: boolean;
}

const useDatetimeCountdown = (
	targetDate: string | undefined,
	formatString: string = 'D[d] H[h] m[m] s[s]',
	config: CountdownConfig = {}
): { countdown: string | null; clearInterval: any } => {
	const { pokeInterval = 1, hideZeroValues = true, stopAtZero = true } = config;

	const [countdown, setCountdown] = useState<string | null>('');
	const intervalRef = useRef<ReturnType<typeof setInterval>>();

	useEffect(() => {
		if (!targetDate) {
			setCountdown('');
			return;
		}

		const updateCountdown = () => {
			const now = dayjs();
			const target = dayjs(targetDate);

			if (stopAtZero && now.isAfter(target)) {
				setCountdown(null);
				if (intervalRef.current) {
					clearInterval(intervalRef.current);
					intervalRef.current = undefined;
				}
				return;
			}

			const diff = Math.abs(target.diff(now));
			const duration = dayjs.duration(diff);

			if (hideZeroValues) {
				const parts = formatString.split(' ');
				const nonZeroParts = parts.filter((part) => {
					const unit = part[0];
					const value =
						duration[
							unit === 'Y'
								? 'years'
								: unit === 'M'
								? 'months'
								: unit === 'D'
								? 'days'
								: unit === 'H'
								? 'hours'
								: unit === 'm'
								? 'minutes'
								: 'seconds'
						]();
					return value > 0;
				});

				let formattedString = duration.format(nonZeroParts.join(' '));
				if (formatString.includes(',')) {
					formattedString = formattedString.replace(/,\s*$/, '');
				}

				setCountdown(formattedString);
			} else {
				setCountdown(duration.format(formatString));
			}
		};

		updateCountdown();
		intervalRef.current = setInterval(updateCountdown, pokeInterval * 1000);

		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
				intervalRef.current = undefined;
			}
		};
	}, [targetDate, formatString, pokeInterval, hideZeroValues, stopAtZero]);

	return {
		countdown,
		clearInterval: () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
				intervalRef.current = undefined;
			}
		}
	};
};

export default useDatetimeCountdown;
