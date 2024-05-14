import { ThemeMode } from '@types';

export const colorScheme = {
	[ThemeMode.dark]: {
		active: {
			background: 'white',
			border: 'white',
			text: 'black',
			icon: 'black'
		},
		inactive: {
			background: 'bg2',
			border: 'bg3',
			text: 't2',
			icon: 't2'
		}
	},
	[ThemeMode.light]: {
		active: {
			background: 'black',
			border: 'white',
			text: 'white',
			icon: 'white'
		},
		inactive: {
			background: 'bg2',
			border: 'bg3',
			text: 't2',
			icon: 't2'
		}
	}
};
