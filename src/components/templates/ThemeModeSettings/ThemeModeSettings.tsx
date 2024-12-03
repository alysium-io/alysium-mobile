import { Vibrator } from '@etc';
import { useTheme } from '@hooks';
import { SingleOptionRadioToggler } from '@molecules';
import { ColorModeState } from '@types';
import React from 'react';

const ThemeModeSettings = () => {
	const { colorModeState, setColorModeState } = useTheme();

	const onChange = (id: string) => {
		Vibrator.clockTick();
		setColorModeState(id as ColorModeState);
	};

	return (
		<SingleOptionRadioToggler
			defaultId={colorModeState}
			onChange={onChange}
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
