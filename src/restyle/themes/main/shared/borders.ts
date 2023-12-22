import { Borders } from '@types'
import { makeBorderSet } from '../../utils/makeBorderSet'


const borders : Borders = {
    underline: makeBorderSet(0.8, '#ffffff'),
    xthin: makeBorderSet(0.17, 'rgba(100, 100, 100, 0.2)'),
    thin: makeBorderSet(0.18, '#333333'),
    regular: makeBorderSet(0.2, '#555555'),
    thick: makeBorderSet(0.8, '#777777'),
    none: makeBorderSet(0, 'transparent')
}

export default borders