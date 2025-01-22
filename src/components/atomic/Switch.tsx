import { useTheme } from '@hooks';
import { ThemeMode } from '@types';
import React from 'react';
import { Switch as RNSwitch } from 'react-native';

interface SwitchProps {
	onPress?: (newValue: boolean) => void;
	value?: boolean;
}

const Switch: React.FC<SwitchProps> = ({ onPress, value }) => {
	const { theme, themeMode } = useTheme();

	return (
		<RNSwitch
			trackColor={{ true: '#81b0ff' }}
			thumbColor={
				themeMode === ThemeMode.dark
					? theme.colors['text.p']
					: theme.colors['text.s']
			}
			ios_backgroundColor={
				themeMode === ThemeMode.dark
					? theme.colors['bg.t']
					: theme.colors['bg.s']
			}
			onValueChange={() => onPress && onPress(!value)}
			value={value}
		/>
	);
};

export default Switch;
