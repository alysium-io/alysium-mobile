import { themes } from '@restyle'
import { BaseTheme } from '@shopify/restyle'
import { ContentType, ThemeMode } from '@types'
import { ViewStyle } from 'react-native'

export type IconSize = {
    small: number
    regular: number
    large: number
    xlarge: number
    expanded: string
}

export type BlurColor = 'dark' | 'light' | 'xlight' | 'prominent' | 'regular' | 'extraDark' | 'chromeMaterial' | 'material' | 'thickMaterial' | 'thinMaterial' | 'ultraThinMaterial' | 'chromeMaterialDark' | 'materialDark' | 'thickMaterialDark' | 'thinMaterialDark' | 'ultraThinMaterialDark' | 'chromeMaterialLight' | 'materialLight' | 'thickMaterialLight' | 'thinMaterialLight' | 'ultraThinMaterialLight'

export type Spacing = {
    none: number
    xs: number
    s: number
    m: number
    l: number
    xl: number
}

export type BorderRadii = {
    none: number
    s: number
    m: number
    l: number
    xl: number
    round: number
    [ContentType.user]: number
    [ContentType.artist]: number
    [ContentType.host]: number
    [ContentType.tag]: number
}

export type BorderSettings = {
    borderBottomWidth?: number
    borderBottomColor?: string
    borderLeftWidth?: number
    borderLeftColor?: string
    borderRightWidth?: number
    borderRightColor?: string
    borderTopWidth?: number
    borderTopColor?: string
    borderWidth?: number
    borderColor?: string
}

export type BorderSet = {
    bottom: BorderSettings
    left: BorderSettings
    right: BorderSettings
    top: BorderSettings
    vertical: BorderSettings
    horizontal: BorderSettings
    all: BorderSettings
}

export type Borders = {
    underline: BorderSet
    xthin: BorderSet
    thin: BorderSet
    regular: BorderSet
    thick: BorderSet
    none: BorderSet
}

export type EtcColors = {
    notchBlur: string
    statusBar: string
    cursor: string
    keyboard: string
}

export type ColorTypes = 'default' | 'ion' | 'meteor' | 'matt' | 'haze'

export type FeatureColors = {
    default_light: string
    default: string
    default_dark: string
    ion_light: string
    ion: string
    ion_dark: string
    matt_light: string
    matt: string
    matt_dark: string
    haze_light: string
    haze: string
    haze_dark: string
    meteor_light: string
    meteor: string
    meteor_dark: string
}

export type Colors = FeatureColors & {
    black: string
    white: string
    transparent: string
    
    bg1: string
    bg2: string
    bg3: string
    t1: string
    t2: string
    t3: string
}

export type Theme = BaseTheme & {
    name: string
    colors: Colors
    spacing: Spacing
    iconSize: IconSize
    cardVariants: {
        defaults: ViewStyle
        primary: ViewStyle
        secondary: ViewStyle
    }
    borderRadii: BorderRadii
    borders: Borders
}

export type ThemeNames = keyof typeof themes

export type ThemeState = {
    mode: ThemeMode
    themeName: ThemeNames
}