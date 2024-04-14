import { createTheme } from '@shopify/restyle';
import { useContext } from 'react';
import { SharedValue, withTiming } from 'react-native-reanimated';
import { useSelector } from 'src/redux';
import { themes } from 'src/restyle';
import { Theme, ThemeMode, ThemeNames } from 'src/types';
import { ThemeContext } from '../contexts/ThemeContext';
import usePersistedAppState from './usePersistedAppState';

interface IUseTheme {
	themeName: string;
	mode: ThemeMode;
	animatedValue: SharedValue<number>;
	setTheme: (theme: ThemeNames) => void;
	theme: Theme;
	otherTheme: Theme;
	setMode: (mode: ThemeMode) => void;
	getRawColor: (color: string) => string;
	isValidColor: (color: string) => boolean;
}

const useTheme = (): IUseTheme => {
	const { setPersistedAppState } = usePersistedAppState();
	const { animatedValue } = useContext(ThemeContext);

	const themeName: ThemeNames = useSelector(
		(state) => state.persistedApp.themeName
	);
	const mode: ThemeMode = useSelector((state) => state.persistedApp.mode);

	const theme = createTheme(themes[themeName][mode]);
	const otherTheme = createTheme(
		themes[themeName][
			mode === ThemeMode.light ? ThemeMode.dark : ThemeMode.light
		]
	);

	const setTheme = (themeName: ThemeNames) => {
		setPersistedAppState({ themeName });
	};

	const setMode = (mode: ThemeMode) => {
		animatedValue.value = withTiming(mode === ThemeMode.light ? 0 : 1, {
			duration: 200
		});
		setPersistedAppState({ mode });
	};

	const getRawColor = (colorName: string): string => {
		if (!isValidColor(colorName)) {
			return colorName;
		}

		return theme.colors[colorName];
	};

	const isValidColor = (color: string): boolean => {
		return color in theme.colors;
	};

	return {
		setTheme,
		mode,
		themeName,
		theme,
		otherTheme,
		setMode,
		animatedValue,
		getRawColor,
		isValidColor
	};
};

export default useTheme;
