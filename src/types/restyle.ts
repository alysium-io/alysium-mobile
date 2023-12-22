import { Text } from '@atomic'

export type RestyleTextColor = Pick<React.ComponentProps<typeof Text>, 'color'>['color']
export type RestyleTextVariant = Pick<React.ComponentProps<typeof Text>, 'variant'>['variant']

export enum ThemeMode {
    light = 'light',
    dark = 'dark'
}