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
			background: 'bg3',
			border: 'white',
			text: 'white',
			icon: 'white'
		},
		inactive: {
			background: 'bg1',
			border: 'bg3',
			text: 't2',
			icon: 't2'
		}
	}
};
