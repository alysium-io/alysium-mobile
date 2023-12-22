import React from 'react'
import { Svg, Path } from '@atomic'
import { IconProps } from '@types'
import { PathProps, SvgProps } from 'react-native-svg'


const svg : SvgProps = {
    viewBox: '0 0 18 18',
    fill: 'none'
}

const path : PathProps = {
    fillRule: 'evenodd',
    d: 'M.5 9a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM7.5 9a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM14.5 9a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z',
    clipRule: 'evenodd'
}

const Meatballs : React.FC<IconProps> = (props) => {

    if (props.animated) {
        return (
            <Svg
                {...svg}
                size={props.size}
                animated={true}
                animatedProps={props.animatedSvgProps}
            >
                <Path
                    {...path}
                    fill={props.color}
                    animated={true}
                    animatedProps={props.animatedPathProps}
                />
            </Svg>
        )
    }

    return (
        <Svg {...svg} size={props.size}>
            <Path {...path} fill={props.color} />
        </Svg>
    )
}

export default Meatballs