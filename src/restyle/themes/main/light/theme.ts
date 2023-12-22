import { Theme } from 'src/types'
import commonTheme from '../../common'
import { borders } from '../shared'
import colors from './colors'


const theme : Theme = {
    name: 'dark',
    ...commonTheme,
    borders,
    colors
}

export default theme