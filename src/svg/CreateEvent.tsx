import React from 'react'
import { Svg, Path } from '@atomic'
import { SvgProps, PathProps } from 'react-native-svg'
import { IconProps } from '@types'


const svg : SvgProps = {
    fill: 'none',
    viewBox: '0 0 81 81'
}

const path1 : PathProps = {
    d: 'M36.203 21.334h-7.6v11.5h-11.4v7.667h11.4V52h7.6V40.5h11.4v-7.667h-11.4v-11.5Z'
}

const path2 : PathProps = {
    d: 'M66.678 6H13.322C7.082 6 2 11.126 2 17.422v46.155C2 69.874 7.082 75 13.322 75H55.2L78 52.003v-34.58C78 11.125 72.918 6 66.678 6ZM59 61.913V59.59c0-2.073 1.67-3.757 3.721-3.757h2.3L59 61.913Zm11.4-13.09c-.98-.387-2.177-.656-3.722-.656H62.72c-6.238 0-11.32 5.126-11.32 11.422v3.988c0 1.482.247 2.715.648 3.755H13.322C11.27 67.333 9.6 65.65 9.6 63.578V17.422c0-2.071 1.67-3.755 3.722-3.755H66.68c2.05 0 3.72 1.684 3.72 3.755v31.401Z'
}

const CreateEvent : React.FC<IconProps> = (props) => {

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

export default CreateEvent