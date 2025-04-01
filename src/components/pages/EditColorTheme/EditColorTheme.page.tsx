import { View } from '@atomic';
import { useTheme } from '@hooks';
import { SwitchListItem } from '@molecules';
import { BasePage } from '@organisms';
import { ThemePicker } from '@templates';
import { ThemeMode } from '@types';
import React from 'react';
import EditColorThemeHeader from './EditColorTheme.header';

const EditColorTheme = () => {
	const { themeMode, setThemeMode } = useTheme();

	return (
		<BasePage>
			<EditColorThemeHeader />
			<View margin='m' gap='m'>
				<SwitchListItem
					title='Dark Mode'
					description='Toggle dark mode'
					value={themeMode === ThemeMode.dark}
					onValueChange={(value) => {
						setThemeMode(value ? ThemeMode.dark : ThemeMode.light);
					}}
				/>
				<ThemePicker />
			</View>
		</BasePage>
	);
};

export default EditColorTheme;
