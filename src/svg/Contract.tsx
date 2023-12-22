import React from 'react'
import { G, Defs, ClipPath, SvgProps, PathProps } from 'react-native-svg'
import { Svg, Path } from '@atomic'
import { IconProps } from '@types'


const svg : SvgProps = {
    viewBox: '0 0 51 51',
    fill: 'none'
}

const path1 : PathProps = {
    d: 'M8.496 0C3.824 0-.008 3.832-.008 8.504v33.992C-.008 47.168 3.824 51 8.496 51h25.505c4.672 0 8.504-3.832 8.504-8.504V40.27l-3.25 3.25a2.74 2.74 0 0 1-1.943.784h-7.034a2.74 2.74 0 0 1-2.735-2.726v-7.035c.001-.73.294-1.43.813-1.943l11.326-11.343h-9.57c-5.457 0-9.928-4.474-9.928-9.932V0H8.496Zm15.938.008v11.318c0 3.176 2.502 5.678 5.678 5.678h12.4c-.127-6.595-2.204-11.151-5.764-13.787C33.343.695 29.013.033 24.434.008ZM8.496 9.035h6.384a2.125 2.125 0 0 1 1.958 2.935 2.125 2.125 0 0 1-1.958 1.32H8.496a2.125 2.125 0 0 1-2.116-2.134 2.125 2.125 0 0 1 2.116-2.12Zm0 7.97h6.384a2.125 2.125 0 0 1 1.958 2.934 2.124 2.124 0 0 1-1.958 1.32H8.496a2.125 2.125 0 0 1-2.116-2.134 2.125 2.125 0 0 1 2.116-2.12Zm0 8.47h14.888a2.126 2.126 0 0 1 1.496 3.63 2.125 2.125 0 0 1-1.496.624H8.496a2.125 2.125 0 0 1-1.958-2.934 2.124 2.124 0 0 1 1.958-1.32Zm0 8.504h14.888a2.126 2.126 0 0 1 0 4.25H8.496a2.125 2.125 0 0 1 0-4.25Z'
}

const path2 : PathProps = {
    d: 'M43.353 20.865a2.125 2.125 0 0 0-1.444.614l-11.903 11.92a2.126 2.126 0 0 0-.631 1.506v5.458a2.125 2.125 0 0 0 2.12 2.117h5.459a2.125 2.125 0 0 0 1.506-.61l11.92-11.924a2.125 2.125 0 0 0 0-3.01l-5.458-5.461a2.125 2.125 0 0 0-1.569-.61Zm-1.71 6.088 3.263 3.258-3.013 3.014-3.263-3.263 3.014-3.009Z'
}

const path3 : PathProps = {
    d: 'M0 0h51v51H0z'
}

const Contract : React.FC<IconProps> = (props) => {

    if (props.animated) {
        return (
            <Svg
                {...svg}
                size={props.size}
            >
                <G fill={props.color} clipPath='url(#a)'>
                    <Path {...path1} />
                    <Path {...path2} />
                </G>
                <Defs>
                    <ClipPath id='a'>
                        <Path {...path3} fill={props.color} />
                    </ClipPath>
                </Defs>
            </Svg>
        )
    }

    return (
        <Svg
            {...svg}
            size={props.size}
        >
            <G fill={props.color} clipPath='url(#a)'>
                <Path {...path1} />
                <Path {...path2} />
            </G>
            <Defs>
                <ClipPath id='a'>
                    <Path {...path3} fill={props.color} />
                </ClipPath>
            </Defs>
        </Svg>
    )

}

export default Contract