import * as React from 'react'
import { Svg, Path } from '@atomic'
import { IconProps } from '@types'
import { SvgProps, PathProps } from 'react-native-svg'


const svg : SvgProps = {
    fill: 'none',
    viewBox: '0 0 475 475'
}

const path : PathProps = {
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    strokeWidth: 50,
    d: 'M236.667 38v400m0-400L70 204.667M236.667 38l166.666 166.667'
}

const TailedArrow : React.FC<IconProps> = (props) => {

    const getDirection = () : string => {
        /**
         * Returns 'right' by default
         */
        switch(props.direction) {
            case 'up':
                return '0deg'
            case 'down':
                return '180deg'
            case 'left':
                return '270deg'
            case 'right':
                return '90deg'
            default:
                return '0deg'
        }
    }

    if (props.animated) {
        return (
            <Svg
                {...svg}
                size={props.size}
                animated={true}
                animatedProps={props.animatedSvgProps}
                style={{ transform: [{ rotate: getDirection() }] }}
            >
                <Path
                    {...path}
                    stroke={props.color}
                    animated={true}
                    animatedProps={props.animatedPathProps}
                />
            </Svg>
        )
    }

    return (
        <Svg {...svg} size={props.size} style={{ transform: [{ rotate: getDirection() }] }}>
            <Path {...path} stroke={props.color} />
        </Svg>
    )

}

export default TailedArrow