import React from 'react'
import { SvgProps, PathProps } from 'react-native-svg'
import { Svg, Path } from '@atomic'
import { IconProps } from '@types'


const svg : SvgProps = {
    viewBox: '0 0 100 100',
    fill: 'none'
}

const path : PathProps = {
    d: 'M54.62 83.9c-.451 0-.902 0-1.352-.223-1.352-.446-2.029-1.787-2.029-3.127V63.13a37.673 37.673 0 0 0-26.591 10.944l-9.014 8.934c-.902.894-2.48 1.34-3.606.67C10.676 83.231 10 81.89 10 80.55v-2.01c0-23.23 18.253-42.438 41.24-44.225V19.35c0-1.34.9-2.457 2.028-3.127 1.126-.446 2.704-.223 3.605.67l32 29.484c.676.67 1.127 1.563 1.127 2.457 0 .893-.45 1.786-.901 2.456l-32 31.717c-.676.67-1.578.894-2.48.894Zm-3.155-27.472h3.155c1.803 0 3.38 1.563 3.38 3.35V72.51l23.662-23.453L58 27.167v10.499c0 1.787-1.578 3.35-3.38 3.35-18.704 0-34.028 13.401-37.409 30.823l2.48-2.457c8.563-8.264 19.83-12.954 31.774-12.954Z'
}

const Share : React.FC<IconProps> = (props) => {

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

export default Share