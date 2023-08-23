import { BaseTheme } from '@shopify/restyle'
import { StatusBarStyle, ViewStyle } from 'react-native'

export type Spacing = {
    none: number;
    xs: number;
    s: number;
    m: number;
    l: number;
    xl: number;
}

export type BorderRadii = {
    none: number;
    s: number;
    m: number;
    l: number;
    xl: number;
    round: number;
}

export type BlurColor = 'light' | 'dark'

export type ColorSet = {

    /**
     * Accents
     */
    accent: string;

    accent900: string;
    accent800: string;
    accent700: string;
    accent600: string;
    accent500: string; // Original
    accent400: string;
    accent300: string;
    accent200: string;
    accent100: string; // Lightest

    /**
     * Signals
     */
    danger: string;
    warning: string;

    /**
     * Backgrounds
     */
    primaryBg: string;
    secondaryBg: string;
    negativePrimaryBg: string;
    negativeSecondaryBg: string;

    /**
     * Text
     */
    primaryText: string;
    secondaryText: string;
    negativePrimaryText: string;
    negativeSecondaryText: string;

    /**
     * Misc
     */
    notchBlur: BlurColor;
    statusBar: StatusBarStyle;
    cursor: string;
    negativeCursor: string;
    transparent: 'transparent';
    keyboard: 'light' | 'dark';

}

export type ThemeName = 'dark' | 'light'

export type Theme = BaseTheme & {
    name: string;
    colors: ColorSet;
    spacing: Spacing;
    cardVariants: {
        defaults: ViewStyle;
        primary: ViewStyle;
        secondary: ViewStyle;
    };
    borderRadii: BorderRadii;
}

