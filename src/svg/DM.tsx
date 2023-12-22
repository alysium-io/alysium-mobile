import React from 'react'
import { Svg, Path } from '@atomic'
import { PathProps, SvgProps } from 'react-native-svg'
import { IconProps } from '@types'


const svg : SvgProps = {
    viewBox: '0 0 19 19',
    fill: 'none'
}

const path : PathProps = {
    d: 'm18.689 1.93-4.312 15.285a1.302 1.302 0 0 1-1.266.957 1.3 1.3 0 0 1-1.183-.751L8.9 11.028l4.37-4.371a.656.656 0 1 0-.927-.928l-4.371 4.37-6.393-3.028a1.313 1.313 0 0 1 .205-2.449L17.07.311a1.312 1.312 0 0 1 1.62 1.62Z'
}

const DM : React.FC<IconProps> = (props) => {

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

export default DM