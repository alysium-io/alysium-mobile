import React from 'react'
import { Svg, Path } from '@atomic'
import { SvgProps, PathProps } from 'react-native-svg'
import { IconProps } from '@types'


const svg : SvgProps = {
    viewBox: '0 0 55 55',
    fill: 'none'
}

const path : PathProps = {
    d: 'M52.262 1.83A7.65 7.65 0 0 0 46.018.108l-24.24 4.09a7.637 7.637 0 0 0-6.398 7.568v27.13a9.229 9.229 0 1 0 3.076 6.86v-26.3l33.468-5.63V32.96a9.031 9.031 0 0 0-6.152-2.369A9.228 9.228 0 1 0 55 39.82V7.706a7.73 7.73 0 0 0-2.738-5.876ZM9.228 51.91a6.152 6.152 0 1 1 6.152-6.152 6.13 6.13 0 0 1-6.152 6.152Zm36.544-5.937a6.152 6.152 0 1 1 0-12.304 6.152 6.152 0 0 1 0 12.304Zm6.152-35.252-33.468 5.63v-4.584a4.562 4.562 0 0 1 3.845-4.522l24.24-4.091a4.592 4.592 0 0 1 5.383 4.553v3.014Z'
}

const Genre : React.FC<IconProps> = (props) => {

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

export default Genre