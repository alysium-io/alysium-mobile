import { Text } from '@atomic';

export type TextVariant = Pick<
	React.ComponentProps<typeof Text>,
	'variant'
>['variant'];

export enum ThemeMode {
	light = 'light',
	dark = 'dark'
}
