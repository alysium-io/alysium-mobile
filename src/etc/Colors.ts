type RGB = {
	r: number;
	g: number;
	b: number;
};

type RGBA = {
	r: number;
	g: number;
	b: number;
	a: number;
};

type YIQ = {
	y: number;
	i: number;
	q: number;
};

class Colors {
	// Helper function to validate HEX color
	static isValidHexColor = (color: string): boolean => {
		return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color);
	};

	// Helper function to adjust color brightness
	static adjustColorBrightness = (
		color: string,
		factor: number,
		brighten: boolean
	): string => {
		if (!Colors.isValidHexColor(color)) {
			throw new Error('Invalid HEX color provided.');
		}

		// Remove the hash at the start if it's there
		color = color.charAt(0) === '#' ? color.slice(1) : color;

		// Parse r, g, b values
		const bigint = parseInt(color, 16);
		const r = (bigint >> 16) & 255;
		const g = (bigint >> 8) & 255;
		const b = bigint & 255;

		// Adjust each individual RGB value
		const adjust = (value: number): number =>
			brighten
				? Math.round(value + (255 - value) * factor)
				: Math.round(value * (1 - factor));
		const ar = adjust(r);
		const ag = adjust(g);
		const ab = adjust(b);

		// Construct the adjusted RGB values back to HEX
		const result = (1 << 24) + (ar << 16) + (ag << 8) + ab;
		return `#${result.toString(16).slice(1).toUpperCase()}`;
	};

	// Helper function to darken color
	static darken = (color: string, factor: number = 0.1): string => {
		return Colors.adjustColorBrightness(color, factor, false);
	};

	// Helper function to brighten color
	static brighten = (color: string, factor: number = 0.1): string => {
		return Colors.adjustColorBrightness(color, factor, true);
	};

	static hex2Alpha = (hexColor: string, alpha: number = 1): string => {
		const { r, g, b } = Colors.hex2RGB(hexColor);
		return Colors.RGBA2String({ r, g, b, a: alpha });
	};

	static RGB2String = ({ r, g, b }: RGB): string => {
		return `rgb(${r}, ${g}, ${b})`;
	};

	static RGBA2String = ({ r, g, b, a }: RGBA): string => {
		return `rgba(${r}, ${g}, ${b}, ${a})`;
	};

	static hex2RGB = (hexColor: string): RGB => {
		const bigint = parseInt(hexColor.slice(1), 16);
		const r = (bigint >> 16) & 255;
		const g = (bigint >> 8) & 255;
		const b = bigint & 255;

		return { r, g, b };
	};

	static parseRGB = (rgbColor: string): RGB => {
		const [r, g, b] = rgbColor.split(',').map((val) => parseInt(val));
		return { r, g, b };
	};

	static parseRGBA = (rgba: string): RGBA => {
		const [r, g, b, a] = rgba.split(',').map((val) => parseInt(val));
		return { r, g, b, a };
	};

	static hex2RGBA = (hexColor: string, alpha: number = 1): RGBA => {
		const { r, g, b } = Colors.hex2RGB(hexColor);
		return { r, g, b, a: alpha };
	};

	static hex2RGBAString = (hexColor: string, alpha: number = 1): string => {
		const { r, g, b } = Colors.hex2RGB(hexColor);
		return Colors.RGBA2String({ r, g, b, a: alpha });
	};

	static RGB2Hex = (rgbColor: number[]) => {
		return (
			'#' +
			rgbColor
				.map((val) => {
					return val.toString(16).padStart(2, '0');
				})
				.join('')
		);
	};

	static RGB2YIQ = ({ r, g, b }: RGB): YIQ => {
		const y = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
		const i = (0.596 * r - 0.274 * g - 0.322 * b) / 255;
		const q = (0.211 * r - 0.523 * g + 0.312 * b) / 255;
		return { y, i, q };
	};

	static hex2YIQ = (hexColor: string): YIQ => {
		const rgb = Colors.hex2RGB(hexColor);
		return Colors.RGB2YIQ(rgb);
	};

	static normalizeColorToRange = (
		hexColor: string,
		minRgb: number = 159,
		maxRgb: number = 239
	) => {
		const { r, g, b } = Colors.hex2RGB(hexColor);
		const minInputRgb = Math.min(r, g, b);
		const maxInputRgb = Math.max(r, g, b);

		// Handle edge case when input color has equal min and max RGB values
		if (minInputRgb === maxInputRgb) {
			const midRgb = minRgb + Math.floor((maxRgb - minRgb) / 2);
			return Colors.RGB2Hex([midRgb, midRgb, midRgb]);
		}

		const adjustedRgbColor = [r, g, b].map((val) => {
			return Math.floor(
				Colors.scaleValue(val, minInputRgb, maxInputRgb, minRgb, maxRgb)
			);
		});

		return Colors.RGB2Hex(adjustedRgbColor);
	};

	static scaleValue = (
		value: number,
		inMin: number,
		inMax: number,
		outMin: number,
		outMax: number
	) => {
		return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
	};

	static getContrastTextColor = (hex: string): string => {
		const luminanceThreshold = 0.7;
		const { r, g, b } = Colors.hex2RGB(hex);
		const { y } = this.RGB2YIQ({ r, g, b });
		return y > luminanceThreshold ? 'black' : 'white';
	};

	static randomColor = (): string => {
		const randomColor = Math.floor(Math.random() * 0xffffff).toString(16);
		return '#' + randomColor.padStart(6, '0');
	};

	static createIntermediateColors = (
		startColor: string,
		endColor: string,
		steps: number
	): string[] => {
		const start = Colors.hex2RGB(startColor);
		const end = Colors.hex2RGB(endColor);
		const colors: string[] = [];

		for (let i = 0; i < steps; i++) {
			const factor = i / (steps - 1);
			const r = Math.round(start.r + factor * (end.r - start.r));
			const g = Math.round(start.g + factor * (end.g - start.g));
			const b = Math.round(start.b + factor * (end.b - start.b));
			colors.push(Colors.RGB2Hex([r, g, b]));
		}

		return colors;
	};
}

export default Colors;
