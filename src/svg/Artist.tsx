import React from 'react'
import { SvgProps, PathProps, G, Defs, ClipPath } from 'react-native-svg'
import { Svg, Path } from '@atomic'
import { IconProps } from '@types'


const svg : SvgProps = {
    viewBox: '0 0 18 18',
    fill: 'none'
}

const path1 : PathProps = {
    d: 'M16.385 11.676c.291.423.437.903.437 1.448 0 .345-.058.66-.175.957l-.767 3.08h1.584V.899H6.784L.655 10.947h3.552v3.984h4.256v2.23h4.16l-.763-3.065a2.542 2.542 0 0 1-.18-.972c0-.544.146-1.025.438-1.448h4.266Zm.03-2.464a3.257 3.257 0 0 1-.234.306h-3.756a2.389 2.389 0 0 1-.233-.209 3.177 3.177 0 0 1-.982-2.142c-.054-.841.185-1.555.714-2.148.53-.588 1.2-.885 2.002-.885.117 0 .234.005.345.02a2.725 2.725 0 0 0-.621 1.638 2.94 2.94 0 0 1 .514-.044c.72 0 1.327.228 1.827.68.5.457.749 1.006.744 1.652a2.151 2.151 0 0 1-.32 1.132Zm-.06.793v1.185H12.12v-1.185h4.237ZM6.435 5.607c.228 0 .422.082.583.243.16.16.243.355.243.583a.785.785 0 0 1-.243.578.796.796 0 0 1-.583.243.786.786 0 0 1-.579-.243.785.785 0 0 1-.243-.578c0-.229.083-.423.243-.583.16-.16.35-.243.579-.243Z'
}

const path2 : PathProps = {
    d: 'M0 0h18v18H0z'
}

const Artist : React.FC<IconProps> = (props) => {

    if (props.animated) {
        return (
            <Svg
                {...svg}
                size={props.size}
                animated={true}
                animatedProps={props.animatedSvgProps}
            >
                <G clipPath='url(#a)'>
                    <Path
                        {...path1}
                        fill={props.color}
                        animated={true}
                        animatedProps={props.animatedPathProps}
                    />
                </G>
                <Defs>
                    <ClipPath id='a'>
                        <Path
                            {...path2}
                            fill={props.color}
                            animated={true}
                            animatedProps={props.animatedPathProps}
                        />
                    </ClipPath>
                </Defs>
            </Svg>
        )
    }

    return (
        <Svg {...svg} size={props.size}>
            <G clipPath='url(#a)'>
                <Path {...path1} fill={props.color} />
            </G>
            <Defs>
                <ClipPath id='a'>
                    <Path {...path2} fill={props.color} />
                </ClipPath>
            </Defs>
        </Svg>
    )

}

export default Artist