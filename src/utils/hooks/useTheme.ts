import { useSelector } from '@flux';
import { ColorModeState, Theme, ThemeMode, ThemeName } from '@types';
import { createTheme } from 'src/restyle/createTheme';
import usePersistedAppState from './usePersistedAppState';

interface IUseTheme {
	theme: Theme;
	themeName: ThemeName;
	themeMode: ThemeMode;
	colorModeState: ColorModeState;
	setThemeName: (themeName: ThemeName) => void;
	setThemeMode: (themeMode: ThemeMode) => void;
	setColorModeState: (colorModeState: ColorModeState) => void;
}

const useTheme = (): IUseTheme => {
	const { setPersistedAppState } = usePersistedAppState();

	const themeName: ThemeName = useSelector(
		(state) => state.persistedApp.themeName
	);
	const themeMode: ThemeMode = useSelector(
		(state) => state.persistedApp.themeMode
	);
	const colorModeState = useSelector(
		(state) => state.persistedApp.colorModeState
	);

	const setThemeName = (themeName: ThemeName) => {
		setPersistedAppState({ themeName });
	};

	const setThemeMode = (themeMode: ThemeMode) => {
		setPersistedAppState({ themeMode });
	};

	const setColorModeState = (colorModeState: ColorModeState) => {
		setPersistedAppState({ colorModeState });
	};

	const _getThemeMode = (): ThemeMode => {
		if (colorModeState === 'alwaysLight') {
			return ThemeMode.light;
		} else if (colorModeState === 'alwaysDark') {
			return ThemeMode.dark;
		} else {
			return themeMode;
		}
	};

	const theme = createTheme(themeName, _getThemeMode());

	return {
		theme,
		themeName,
		themeMode,
		colorModeState,
		setThemeName,
		setThemeMode,
		setColorModeState
	};
};

export default useTheme;
