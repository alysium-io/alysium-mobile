import React from 'react'
import { IconNames, SvgIcons } from '@svg'
import { IconProps as CustomIconProps } from '@types'


type IconProps = CustomIconProps & {
    name: IconNames;
}

const Icon : React.FC<IconProps> = (props) => {

    const SvgIcon = SvgIcons[props.name]

    if (props.animated) {
        return (
            <SvgIcon
                animated={true}
                animatedSvgProps={props.animatedSvgProps || {}}
                animatedPathProps={props.animatedPathProps || {}}
                color={props.color}
                size={props.size}
            />
        )
    }

    return (
        <SvgIcon
            animated={false}
            color={props.color}
            size={props.size}
        />
    )

}

export default Icon