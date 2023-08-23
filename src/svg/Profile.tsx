import React from 'react'
import { IconProps } from 'src/types'
import { SvgProps, PathProps } from 'react-native-svg'
import { Svg, Path } from 'src/components/atomic'


const svg : SvgProps = {
    fill: 'none',
    viewBox: '0 0 24 24'
}

const path1 : PathProps = {
    d: 'M12.12 12.78a.963.963 0 0 0-.24 0 3.27 3.27 0 0 1-3.16-3.27c0-1.81 1.46-3.28 3.28-3.28a3.276 3.276 0 0 1 .12 6.55ZM18.74 19.38A9.934 9.934 0 0 1 12 22c-2.6 0-4.96-.99-6.74-2.62.1-.94.7-1.86 1.77-2.58 2.74-1.82 7.22-1.82 9.94 0 1.07.72 1.67 1.64 1.77 2.58Z',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    strokeWidth: 1.5
}

const path2 : PathProps = {
    d: 'M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Z',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    strokeWidth: 1.5
}

const Profile : React.FC<IconProps> = (props) => {
    
    if (props.animated) {
        return (
            <Svg {...svg} size={props.size}>
                <Path
                    {...path1}
                    stroke={props.color}
                    animated={true}
                    animatedProps={props.animatedPathProps}
                />
                <Path
                    {...path2}
                    stroke={props.color}
                    animated={true}
                    animatedProps={props.animatedPathProps}
                />
            </Svg>
        )
    }

    return (
        <Svg {...svg} size={props.size}>
            <Path {...path1} stroke={props.color} />
            <Path {...path2} stroke={props.color} />
        </Svg>
    )

}

export default Profile