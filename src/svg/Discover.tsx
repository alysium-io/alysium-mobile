import React from 'react'
import { Svg, Path } from '@atomic'
import { IconProps } from '@types'
import { G, SvgProps, PathProps } from 'react-native-svg'


const svg : SvgProps = {
    viewBox: '0 0 18 18',
    fill: 'none'
}

const path1 : PathProps = {
    d: 'M8.348.54H.54v7.808h7.81V.54ZM4.444 17.458a3.905 3.905 0 1 0 0-7.81 3.905 3.905 0 0 0 0 7.81ZM17.458 9.648h-7.81v7.81h7.81v-7.81ZM13.553 8.348a3.905 3.905 0 1 0 0-7.809 3.905 3.905 0 0 0 0 7.81Z'
}

const Discover : React.FC<IconProps> = (props) => {

    if (props.animated) {
        return (
            <Svg
                {...svg}
                size={props.size}
                animated={true}
                animatedProps={props.animatedSvgProps}
            >
                <G fill={props.color} clipPath='url(#a)'>
                    <Path
                        {...path1}
                        animated={true}
                        animatedProps={props.animatedPathProps}
                    />
                </G>
            </Svg>
        )
    }

    return (
        <Svg {...svg} size={props.size}>
            <G fill={props.color} clipPath='url(#a)'>
                <Path {...path1} />
            </G>
        </Svg>
    )

}

export default Discover