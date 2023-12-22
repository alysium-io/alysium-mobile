import React from 'react'
import { SvgProps, PathProps } from 'react-native-svg'
import { Svg, Path } from '@atomic'
import { IconProps } from '@types'


const svg : SvgProps = {
    viewBox: '0 0 100 100',
    fill: 'none'
}

const path1 : PathProps = {
    d: 'M72.398 62.6c-1.3 0-2.6-.5-3.7-1.5-2-2-2-5.3 0-7.3l11.3-11.2c3-3 4.7-7 4.7-11.3-.1-4.3-1.7-8.3-4.7-11.3-6-6-16.5-6-22.6 0l-11.2 11.2c-2 2-5.3 2-7.3 0s-2-5.3 0-7.3l11.2-11.2c5-5 11.6-7.7 18.6-7.7 7 0 13.6 2.7 18.6 7.7 4.9 4.9 7.7 11.5 7.7 18.6 0 7.1-2.8 13.7-7.7 18.6l-11.2 11.2c-1 1-2.4 1.5-3.7 1.5ZM31.3 95c-7 0-13.6-2.7-18.6-7.7C7.8 82.4 5 75.8 5 68.7c0-7.1 2.8-13.7 7.7-18.6l11.2-11.2c2-2 5.3-2 7.3 0s2 5.3 0 7.3L20 57.4c-3 3-4.7 7-4.7 11.3C15.4 73 17 77 20 80c6 6 16.5 6 22.6 0l11.2-11.2c2-2 5.3-2 7.3 0s2 5.3 0 7.3L49.9 87.3c-5 5-11.6 7.7-18.6 7.7Z'
}

const path2 : PathProps = {
    d: 'M38.802 66.4c-1.3 0-2.6-.5-3.7-1.5-2-2-2-5.3 0-7.3l22.4-22.4c2-2 5.3-2 7.3 0s2 5.3 0 7.3l-22.4 22.4c-1 1-2.3 1.5-3.6 1.5Z'
}

const Link : React.FC<IconProps> = (props) => {

    if (props.animated) {
        return (
            <Svg
                {...svg}
                size={props.size}
                animated={true}
                animatedProps={props.animatedSvgProps}
            >
                <Path
                    {...path1}
                    fill={props.color}
                    animated={true}
                    animatedProps={props.animatedPathProps}
                />
                <Path
                    {...path2}
                    fill={props.color}
                    animated={true}
                    animatedProps={props.animatedPathProps}
                />
            </Svg>
        )
    }

    return (
        <Svg {...svg} size={props.size}>
            <Path {...path1} fill={props.color} />
            <Path {...path2} fill={props.color} />
        </Svg>
    )

}

export default Link