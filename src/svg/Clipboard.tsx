import React from 'react'
import { Svg, Path } from '@atomic'
import { SvgProps, PathProps } from 'react-native-svg'
import { IconProps } from '@types'


const svg : SvgProps = {
    viewBox: '0 0 18 18',
    fill: 'none'
}

const path1 : PathProps = {
    d: 'M11.004.445h-4.02c-.89 0-1.617.719-1.617 1.608v.804c0 .89.719 1.608 1.608 1.608h4.029c.89 0 1.608-.718 1.608-1.608v-.804A1.6 1.6 0 0 0 11.004.445Z'
}

const path2 : PathProps = {
    d: 'M13.479 2.857a2.479 2.479 0 0 1-2.472 2.472h-4.02a2.479 2.479 0 0 1-2.472-2.472c0-.479-.513-.778-.941-.556A3.825 3.825 0 0 0 1.547 5.68v8.049a3.833 3.833 0 0 0 3.823 3.823h7.253a3.833 3.833 0 0 0 3.824-3.823v-8.05a3.825 3.825 0 0 0-2.027-3.378c-.428-.222-.941.077-.941.556ZM9.322 13.232H5.576a.646.646 0 0 1-.642-.641c0-.35.29-.641.641-.641h3.747c.35 0 .641.29.641.641 0 .35-.29.642-.641.642Zm2.24-3.42H5.577a.646.646 0 0 1-.642-.642c0-.351.29-.642.641-.642h5.988c.35 0 .641.291.641.642 0 .35-.29.641-.641.641Z'
}

const Clipboard : React.FC<IconProps> = (props) => {

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

export default Clipboard