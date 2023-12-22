import React from 'react'
import { IconNames, SvgIcons } from '@svg'
import { IconProps as CustomIconProps, IconSize } from '@types'
import { useTheme } from '@hooks'


type IconProps = CustomIconProps & {
    name: IconNames
    size?: keyof IconSize
}

const Icon : React.FC<IconProps> = (props) => {

    const { theme, getRawColor } = useTheme()

    // default: regular
    const size = props.size ? theme.iconSize[props.size] : theme.iconSize.regular
    
    // default: t1
    const color = props.color ? getRawColor(props.color) : theme.colors.t1

    const SvgIcon = SvgIcons[props.name]

    if (props.animated) {
        return (
            <SvgIcon
                animatedSvgProps={props.animatedSvgProps || {}}
                animatedPathProps={props.animatedPathProps || {}}
                {...props}
                size={size}
            />
        )
    }
    
    return <SvgIcon {...props} size={size} color={color} />

}

export default Icon