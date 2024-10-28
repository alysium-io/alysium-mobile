// Define all possible size units
enum Unit {
	// Bytes
	B = 'B',
	KB = 'KB',
	MB = 'MB',
	GB = 'GB',
	TB = 'TB',
	PB = 'PB',

	// Bits
	BIT = 'bit',
	KBIT = 'Kbit',
	MBIT = 'Mbit',
	GBIT = 'Gbit',
	TBIT = 'Tbit',
	PBIT = 'Pbit'
}

// Conversion rates
const BYTE_TO_BIT = 8;
const BASE = 1024; // Using binary prefix (1024) rather than decimal (1000)

// Converting everything to bytes first as the base unit
const toByte = (size: number, unit: Unit): number => {
	switch (unit) {
		// Byte conversions
		case Unit.B:
			return size;
		case Unit.KB:
			return size * BASE;
		case Unit.MB:
			return size * Math.pow(BASE, 2);
		case Unit.GB:
			return size * Math.pow(BASE, 3);
		case Unit.TB:
			return size * Math.pow(BASE, 4);
		case Unit.PB:
			return size * Math.pow(BASE, 5);

		// Bit conversions
		case Unit.BIT:
			return size / BYTE_TO_BIT;
		case Unit.KBIT:
			return (size * BASE) / BYTE_TO_BIT;
		case Unit.MBIT:
			return (size * Math.pow(BASE, 2)) / BYTE_TO_BIT;
		case Unit.GBIT:
			return (size * Math.pow(BASE, 3)) / BYTE_TO_BIT;
		case Unit.TBIT:
			return (size * Math.pow(BASE, 4)) / BYTE_TO_BIT;
		case Unit.PBIT:
			return (size * Math.pow(BASE, 5)) / BYTE_TO_BIT;
	}
};

// Converting from bytes to target unit
const fromByte = (bytes: number, unit: Unit): number => {
	switch (unit) {
		// Byte conversions
		case Unit.B:
			return bytes;
		case Unit.KB:
			return bytes / BASE;
		case Unit.MB:
			return bytes / Math.pow(BASE, 2);
		case Unit.GB:
			return bytes / Math.pow(BASE, 3);
		case Unit.TB:
			return bytes / Math.pow(BASE, 4);
		case Unit.PB:
			return bytes / Math.pow(BASE, 5);

		// Bit conversions
		case Unit.BIT:
			return bytes * BYTE_TO_BIT;
		case Unit.KBIT:
			return (bytes * BYTE_TO_BIT) / BASE;
		case Unit.MBIT:
			return (bytes * BYTE_TO_BIT) / Math.pow(BASE, 2);
		case Unit.GBIT:
			return (bytes * BYTE_TO_BIT) / Math.pow(BASE, 3);
		case Unit.TBIT:
			return (bytes * BYTE_TO_BIT) / Math.pow(BASE, 4);
		case Unit.PBIT:
			return (bytes * BYTE_TO_BIT) / Math.pow(BASE, 5);
	}
};

/**
 * Converts a size from one unit to another
 * @param size The numeric value to convert
 * @param from The unit to convert from
 * @param to The unit to convert to
 * @returns The converted size
 * @example
 * convert(1024, Unit.KB, Unit.MB) // returns 1
 * convert(1, Unit.MB, Unit.KB) // returns 1024
 * convert(1, Unit.MB, Unit.MBIT) // returns 8
 */
export const convert = (size: number, from: Unit, to: Unit): number => {
	if (size < 0) {
		throw new Error('Size cannot be negative');
	}

	// Convert to bytes first, then to target unit
	const bytes = toByte(size, from);
	return fromByte(bytes, to);
};

// Export the Unit enum for use
export { Unit };
