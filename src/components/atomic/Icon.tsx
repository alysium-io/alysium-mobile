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
                animatedSvgProps={props.animatedSvgProps || {}}
                animatedPathProps={props.animatedPathProps || {}}
                {...props}
            />
        )
    }

    return <SvgIcon {...props} />

}

export default Icon