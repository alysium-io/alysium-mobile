import React from 'react'
import { SvgProps, PathProps } from 'react-native-svg'
import { Svg, Path } from '@atomic'
import { IconProps } from '@types'


const svg : SvgProps = {
    viewBox: '0 0 18 18',
    fill: 'none'
}

const path : PathProps = {
    d: 'm17.73 16.412-4.587-4.588c2.25-2.868 2.029-7.06-.618-9.662A7.339 7.339 0 0 0 7.321 0c-1.984 0-3.793.75-5.16 2.162C.75 3.529 0 5.382 0 7.324c0 1.94.75 3.794 2.161 5.205a7.339 7.339 0 0 0 5.204 2.162 7.22 7.22 0 0 0 4.499-1.544l4.587 4.588a.897.897 0 0 0 .661.265.897.897 0 0 0 .662-.265c.308-.353.308-.97-.044-1.323Z'
}

const SearchFilled : React.FC<IconProps> = (props) => {

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

export default SearchFilled