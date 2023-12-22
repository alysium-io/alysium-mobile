import React from 'react'
import { Svg, Path } from '@atomic'
import { SvgProps, PathProps } from 'react-native-svg'
import { IconProps } from '@types'


const svg : SvgProps = {
    viewBox: '0 0 18 18',
    fill: 'none'
}

const path : PathProps = {
    d: 'M2.529 14.906h9.264a2.25 2.25 0 0 0 1.82-.928l3.434-4.728a.563.563 0 0 0 0-.666L13.61 3.997a2.25 2.25 0 0 0-1.8-.903H2.529A1.687 1.687 0 0 0 .84 4.78v8.438a1.688 1.688 0 0 0 1.688 1.687Z'
}

const Tag : React.FC<IconProps> = (props) => {

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
            <Path {...path}  fill={props.color} />
        </Svg>
    )
}

export default Tag