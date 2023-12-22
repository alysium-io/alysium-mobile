import React from 'react'
import { SvgProps, PathProps } from 'react-native-svg'
import { Svg, Path } from '@atomic'
import { IconProps } from '@types'


const svg : SvgProps = {
    viewBox: '0 0 79 79',
    fill: 'none'
}

const path : PathProps = {
    d: 'M17.996 57.703a1 1 0 0 1 0-1.414l16.065-16.067a1 1 0 0 0 0-1.414L18.02 22.765a1 1 0 0 1 0-1.414l3.313-3.313a1 1 0 0 1 1.415 0L38.78 34.075a1 1 0 0 0 1.414 0L56.28 17.989a1 1 0 0 1 1.415 0L61 21.297a1 1 0 0 1 0 1.414L44.913 38.808a1 1 0 0 0 0 1.414l16.053 16.057a1 1 0 0 1 0 1.414l-3.307 3.308a1 1 0 0 1-1.414 0l-16.05-16.047a1 1 0 0 0-1.414 0L22.719 61.012a1 1 0 0 1-1.414 0l-3.309-3.309Z'
}

const X : React.FC<IconProps> = (props) => {

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

export default X