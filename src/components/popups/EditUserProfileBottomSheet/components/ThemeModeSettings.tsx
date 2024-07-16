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
					titleTextProps: {
						title: 'default',
						titleVariant: 'paragraph'
					}
				},
				{
					id: 'alwaysLight',
					titleTextProps: {
						title: 'always light',
						titleVariant: 'paragraph'
					}
				},
				{
					id: 'alwaysDark',
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
