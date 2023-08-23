import { Theme, ColorSet } from 'src/types'
import commonTheme from './common'


const colors : ColorSet = {

    accent: '#8CFFE8',

    accent900: '#4f9f8b',
    accent800: '#61b29a',
    accent700: '#72c6a8',
    accent600: '#83d9b6',
    accent500: '#8cffe8', // Original
    accent400: '#99ffed',
    accent300: '#a6fff2',
    accent200: '#b2fffd',
    accent100: '#ccffff', // Lightest     

    danger: '#f86f6f',
    warning: '#FFC641',

    primaryBg: '#111111',
    secondaryBg: '#1a1a1a',
    negativePrimaryBg: '#777777',
    negativeSecondaryBg: '#555555',

    primaryText: '#ffffff',
    secondaryText: '#aaaaaa',
    negativePrimaryText: '#000000',
    negativeSecondaryText: '#777777',

    notchBlur: 'dark',
    statusBar: 'light-content',

    cursor: '#cccccc',
    negativeCursor: '#777777',
    transparent: 'transparent',
    keyboard: 'dark'

}

const theme : Theme = {
    name: 'dark',
    ...commonTheme,
    colors
}

export default theme