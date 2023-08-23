import React from 'react'
import { Svg, Path } from 'src/components/atomic'
import { IconProps } from '../types'
import { SvgProps, PathProps } from 'react-native-svg'


const svg : SvgProps = {
    fill: 'none',
    viewBox: '0 0 74 74'
}

const path : PathProps = {
    d: 'm72.002 66.3-17.9-17.9c9-11.7 8.1-28.6-2.7-39.3-5.9-5.9-13.5-8.8-21.2-8.8-7.7 0-15.3 2.9-21.2 8.8-11.7 11.7-11.7 30.7 0 42.4 5.9 5.9 13.5 8.8 21.2 8.8 6.4 0 12.8-2 18.1-6.1l18 17.8c.8.8 1.8 1.2 2.9 1.2 1 0 2.1-.4 2.9-1.2 1.5-1.5 1.5-4.1-.1-5.7Zm-41.7-14.1c-5.9 0-11.3-2.3-15.5-6.4-8.5-8.5-8.5-22.4 0-31 4.1-4.1 9.6-6.4 15.5-6.4s11.3 2.3 15.5 6.4c4.2 4.1 6.4 9.6 6.4 15.5s-2.3 11.3-6.4 15.5c-4.1 4.2-9.7 6.4-15.5 6.4Z'
}

const Search : React.FC<IconProps> = (props) => {

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

export default Search