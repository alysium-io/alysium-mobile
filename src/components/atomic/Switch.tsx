import { useTheme } from '@hooks';
import { Props, ThemeMode } from '@types';
import React from 'react';
import { Switch as RNSwitch } from 'react-native';

interface SwitchProps extends Props<typeof RNSwitch> {
	onPress?: (newValue: boolean) => void;
	value?: boolean;
}

const Switch: React.FC<SwitchProps> = ({ ...props }) => {
	const { theme, themeMode } = useTheme();

	return (
		<RNSwitch
			trackColor={{ true: theme.colors.primary }}
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
			{...props}
		/>
	);
};

export default Switch;
