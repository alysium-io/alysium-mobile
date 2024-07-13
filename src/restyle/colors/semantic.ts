import { SemanticVariants, ThemeMode, ThemeName } from '@types';
import { createSemanticDarkTheme } from './dark';
import { createSemanticLightTheme } from './light';

const createSemanticVariants = (themeName: ThemeName): SemanticVariants => {
	return {
		[ThemeMode.dark]: createSemanticDarkTheme(themeName),
		[ThemeMode.light]: createSemanticLightTheme(themeName)
	};
};

const themes = {
	alysium: createSemanticVariants('alysium'),
	sunset: createSemanticVariants('sunset')
};

export default themes;
