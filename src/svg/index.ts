import Search from './Search'
import Profile from './Profile'
import Logo from './Logo'
import Lock from './Lock'
import Arrow from './Arrow'
import DM from './DM'
import Star from './Star'
import Genre from './Genre'

export const SvgIcons = {
    'search': Search,
    'profile': Profile,
    'logo': Logo,
    'lock': Lock,
    'arrow': Arrow,
    'dm': DM,
    'star': Star,
    'genre': Genre
}

export type IconNames = keyof typeof SvgIcons