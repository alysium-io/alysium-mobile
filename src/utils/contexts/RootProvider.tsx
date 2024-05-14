import React from 'react';
import { ThemeProvider } from './ThemeContext';

interface RootProviderProps {
	children: React.ReactNode;
}

const RootProvider: React.FC<RootProviderProps> = ({ children }) => (
	<>
		<ThemeProvider>{children}</ThemeProvider>
	</>
);

export default RootProvider;
