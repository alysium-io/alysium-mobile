import { createTheme as restyleCreateTheme } from '@shopify/restyle';
import { Theme, ThemeMode, ThemeName } from '@types';
import { borderRadii } from './borderRadii';
import { borderWidth } from './borderWidth';
import themes from './colors/semantic';
import { iconSize } from './iconSize';
import { spacing } from './spacing';
import { textVariants } from './text';

export const createTheme = (
	themeName: ThemeName,
	themeMode: ThemeMode
): Theme => {
	return restyleCreateTheme({
		name: themeName,
		cardVariants: {
			defaults: {},
			primary: {
				backgroundColor: 'bg.p'
			},
			secondary: {
				backgroundColor: 'bg.s'
			}
		},
		imageVariants: {
			defaults: {}
		},
		breakpoints: {
			phone: 0,
			tablet: 768
		},
		spacing: spacing,
		borderRadii: borderRadii,
		iconSize: iconSize,
		borderWidth: borderWidth,
		colors: themes[themeName][themeMode],
		textVariants: textVariants
	});
};
