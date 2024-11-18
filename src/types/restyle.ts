import { Text } from '@atomic';
import { Props } from '@types';

export type TextVariant = Pick<Props<typeof Text>, 'variant'>['variant'];

export enum ThemeMode {
	light = 'light',
	dark = 'dark'
}
