import React from 'react'
import { Svg, Path } from 'src/components/atomic'
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

const SvgComponent : React.FC<IconProps> = (props) => {

    if (props.animated) {
        return (
            <Svg
                {...svg}
                animated={true}
                animatedProps={props.animatedProps}
                size={props.size}
            >
                <Path
                    {...path}
                    animated={true}
                    animatedProps={props.animatedProps}
                    fill={props.color}
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

export default SvgComponent