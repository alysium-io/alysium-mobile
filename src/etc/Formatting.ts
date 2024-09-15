import day from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

day.extend(utc);
day.extend(timezone);

class Formatting {
	static formatPhoneNumber = (input: string): string => {
		/**
		 * Function that formats a phone number to (XXX) XXX-XXXX
		 */

		// Strip all characters from the input except digits
		input = Formatting.cleanStringToNumber(input);

		// Trim the remaining input to ten characters, to preserve phone number format
		input = input.substring(0, 10);

		// Based upon the length of the string, we add formatting as necessary
		let size = input.length;
		if (size == 0) {
			input = input;
		} else if (size < 4) {
			input = '(' + input;
		} else if (size < 7) {
			input = '(' + input.substring(0, 3) + ') ' + input.substring(3, 6);
		} else {
			input =
				'(' +
				input.substring(0, 3) +
				') ' +
				input.substring(3, 6) +
				'-' +
				input.substring(6, 10);
		}
		return input;
	};

	static cleanStringToNumber = (input: string): string => {
		/**
		 * Function that removes all non-numeric characters from a string
		 */

		return input.replace(/\D/g, '');
	};

	static formatCommaSeparatedNumber = (
		input: number | string | null
	): string => {
		/**
		 * Function that formats a number to include commas
		 */

		if (input === null || input === '') {
			return '';
		}

		if (typeof input === 'string') {
			// Strip all characters from the input except digits
			input = parseInt(Formatting.cleanStringToNumber(input));
		}

		// You must pass a number to the `toLocaleString` function
		return input.toLocaleString();
	};

	static toUtcIsoFormat = (timestamp: Date | string | null): string | null => {
		/**
		 * Function that formats a JS date object to a string that can be used in a Postgres timestamp (US Standard Format)
		 */
		if (timestamp === null) {
			return null;
		}
		return day(timestamp).utc().format();
	};

	static abbreviateNumber = (num: number | null | undefined): string => {
		if (num === null || num === undefined) {
			return '0';
		}

		const absNum = Math.abs(num);
		const sign = num < 0 ? '-' : '';

		if (absNum >= 1000000000) {
			return sign + (absNum / 1000000000).toFixed(1).replace(/\.0$/, '') + 'B';
		}
		if (absNum >= 1000000) {
			return sign + (absNum / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
		}
		if (absNum >= 1000) {
			return sign + (absNum / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
		}
		return sign + absNum.toString();
	};

	static getNumFollowersSuffix = (num: number | null | undefined): string => {
		if (num === undefined || num === null) {
			return 'followers';
		}
		return num === 1 ? 'follower' : 'followers';
	};

	static formatNumFollowers = (num: number | null | undefined): string => {
		if (num === undefined || num === null) {
			return '0 followers';
		}

		return `${Formatting.abbreviateNumber(
			num
		)} ${Formatting.getNumFollowersSuffix(num)}`;
	};
}

export default Formatting;
