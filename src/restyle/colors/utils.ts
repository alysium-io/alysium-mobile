import { Colors } from '@etc';
import { ColorPalette } from '@types';

interface ColorPaletteOptions {
	top?: string;
	bottom?: string;
}

export const createColorPalette = (
	coreColor: string,
	options: ColorPaletteOptions = {}
): ColorPalette => {
	const core = Colors.hex2RGB(coreColor);

	const topColor =
		options.top ||
		Colors.RGB2Hex([
			Math.min(255, core.r + Math.round((255 - core.r) * 0.9)),
			Math.min(255, core.g + Math.round((255 - core.g) * 0.9)),
			Math.min(255, core.b + Math.round((255 - core.b) * 0.9))
		]);

	const bottomColor =
		options.bottom ||
		Colors.RGB2Hex([
			Math.max(0, core.r - Math.round(core.r * 0.9)),
			Math.max(0, core.g - Math.round(core.g * 0.9)),
			Math.max(0, core.b - Math.round(core.b * 0.9))
		]);

	const upperColors = Colors.createIntermediateColors(topColor, coreColor, 5);
	const lowerColors = Colors.createIntermediateColors(
		coreColor,
		bottomColor,
		5
	);

	return {
		p1: upperColors[0],
		p2: upperColors[1],
		p3: upperColors[2],
		p4: upperColors[3],
		p5: coreColor,
		p6: lowerColors[1],
		p7: lowerColors[2],
		p8: lowerColors[3],
		p9: lowerColors[4]
	};
};

export const createGradientPalette = (
	topColor: string,
	bottomColor: string
): ColorPalette => {
	const colors = Colors.createIntermediateColors(topColor, bottomColor, 9);

	return {
		p1: colors[0],
		p2: colors[1],
		p3: colors[2],
		p4: colors[3],
		p5: colors[4],
		p6: colors[5],
		p7: colors[6],
		p8: colors[7],
		p9: colors[8]
	};
};
