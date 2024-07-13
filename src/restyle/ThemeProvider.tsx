import { ThemeProvider as RestyleThemeProvider } from '@shopify/restyle';
import React from 'react';
import { useTheme } from 'src/utils/hooks';

interface ThemeProviderProps {
	children: React.ReactNode;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
	const { theme } = useTheme();
	return <RestyleThemeProvider theme={theme}>{children}</RestyleThemeProvider>;
};

export default ThemeProvider;
