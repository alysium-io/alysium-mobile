import { AccentColors, ThemeName } from '@types';
import { createColorPalette, createGradientPalette } from './utils';

// Brand
const ION_CORE = '#BCCBDA';
const MATT_CORE = '#7BA493';
export const ionPalette = createColorPalette(ION_CORE);
export const mattPalette = createColorPalette(MATT_CORE);

// Neutrals
const NEUTRAL_TOP = '#FFFFFF';
const NEUTRAL_BOTTOM = '#121212';
export const neutralPalette = createGradientPalette(
	NEUTRAL_TOP,
	NEUTRAL_BOTTOM
);

// Accents
const HAZE_CORE = '#D78FC7';
const METEOR_CORE = '#EBECA0';
const SIEON_CORE = '#F09C9C';
const HONEY_CORE = '#FFD48F';
const MINT_CORE = '#98EECA';
export const hazePalette = createColorPalette(HAZE_CORE);
export const meteorPalette = createColorPalette(METEOR_CORE);
export const sieonPalette = createColorPalette(SIEON_CORE);
export const honeyPalette = createColorPalette(HONEY_CORE);
export const mintPalette = createColorPalette(MINT_CORE);

export const accentColors: AccentColors = {
	alysium: {
		t: hazePalette,
		q: meteorPalette
	},
	sunset: {
		t: sieonPalette,
		q: honeyPalette
	}
};

const coreColors = {
	s: ionPalette,
	p: mattPalette,
	neutral: neutralPalette
};

export const createThemePalette = (themeName: ThemeName) => {
	return {
		...coreColors,
		t: accentColors[themeName].t,
		q: accentColors[themeName].q
	};
};
