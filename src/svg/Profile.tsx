import React from 'react'
import { Svg, Path } from '@atomic'
import { PathProps, SvgProps } from 'react-native-svg'
import { IconProps } from '@types'


const svg : SvgProps = {
    viewBox: '0 0 18 18',
    fill: 'none'
}

const path : PathProps = {
    d: 'M5.052 4.016a3.946 3.946 0 1 1 7.893 0 3.946 3.946 0 0 1-7.893 0ZM.898 17.31a8.1 8.1 0 1 1 16.2 0v.623H.9v-.623Z'
}

const Profile : React.FC<IconProps> = (props) => {

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

export default Profile