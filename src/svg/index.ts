import Search from './Search'
import Profile from './Profile'
import Logo from './Logo'
import Lock from './Lock'
import ArrowRight from './ArrowRight'

export const SvgIcons = {
    'search': Search,
    'profile': Profile,
    'logo': Logo,
    'lock': Lock,
    'arrow-right': ArrowRight
}

export type IconNames = keyof typeof SvgIcons