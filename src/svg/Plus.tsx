import React from 'react'
import { IconProps } from '@types'
import { Svg, Path } from '@atomic'
import { SvgProps, PathProps } from 'react-native-svg'


const svg : SvgProps = {
    viewBox: '0 0 18 18',
    fill: 'none'
}

const path : PathProps = {
    d: 'M.956 8.044h7.08L8.038.973h1.916L9.952 8.04h7.089v1.913l-7.092.002-.001 7.076H8.035V9.96l-7.08-.001V8.044Z'
}

const Plus : React.FC<IconProps> = (props) => {

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
                    animatedProps={props.animatedSvgProps}
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

export default Plus