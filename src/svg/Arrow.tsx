import React from 'react'
import { Svg, Path } from '@atomic'
import { IconProps } from 'src/types'
import { SvgProps, PathProps } from 'react-native-svg'


const svg : SvgProps = {
    viewBox: '0 0 45 45',
    fill: 'none'
}

const path : PathProps = {
    d: 'M13.249 44.342c.828.877 2.169.877 2.995 0L33.76 25.75c1.655-1.756 1.655-4.605 0-6.36L16.117.657a2.033 2.033 0 0 0-2.974-.022c-.85.874-.857 2.316-.023 3.204l16.147 17.138c.828.88.828 2.302 0 3.182L13.249 41.163c-.828.877-.828 2.302 0 3.18Z',
    fillRule: 'evenodd',
    clipRule: 'evenodd'
}

const Arrow : React.FC<IconProps> = (props) => {

    const getDirection = () : string => {
        /**
         * Returns 'right' by default
         */
        switch(props.direction) {
            case 'up':
                return '270deg'
            case 'down':
                return '90deg'
            case 'left':
                return '180deg'
            case 'right':
                return '0deg'
            default:
                return '0deg'
        }
    }

    if (props.animated) {
        return (
            <Svg
                {...svg}
                animated={true}
                animatedProps={props.animatedSvgProps}
                size={props.size}
                style={{ transform: [{ rotate: getDirection() }] }}
            >
                <Path
                    {...path}
                    animated={true}
                    animatedProps={props.animatedPathProps}
                    fill={props.color}
                />
            </Svg>
        )
    }

    return (
        <Svg {...svg} size={props.size} style={{ transform: [{ rotate: getDirection() }] }}>
            <Path {...path} fill={props.color} />
        </Svg>
    )

}

export default Arrow