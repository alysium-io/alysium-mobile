import { useTheme } from '@hooks';
import { SingleOptionRadioToggler } from '@organisms';
import { ColorModeState } from '@types';
import React from 'react';

const ThemeModeSettings = () => {
	const { colorModeState, setColorModeState } = useTheme();

	return (
		<SingleOptionRadioToggler
			defaultId={colorModeState}
			onChange={(id: string) => setColorModeState(id as ColorModeState)}
			items={[
				{
					id: 'default',
					onPress: () => console.log('Option 1 pressed'),
					titleTextProps: {
						title: 'default',
						titleVariant: 'paragraph'
					}
				},
				{
					id: 'alwaysLight',
					onPress: () => console.log('Option 2 pressed'),
					titleTextProps: {
						title: 'always light',
						titleVariant: 'paragraph'
					}
				},
				{
					id: 'alwaysDark',
					onPress: () => console.log('Option 3 pressed'),
					titleTextProps: {
						title: 'always dark',
						titleVariant: 'paragraph'
					}
				}
			]}
		/>
	);
};

export default ThemeModeSettings;
