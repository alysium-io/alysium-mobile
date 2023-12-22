import * as React from 'react'
import { SvgProps, PathProps } from 'react-native-svg'
import { Svg, Path } from '@atomic'
import { useTheme } from '@hooks'
import { IconProps } from '@types'


const svg : SvgProps = {
    viewBox: '0 0 360 360',
    fill: 'none'
}

const path1 : PathProps = {
    d: 'M300 270H60l30-30v-90a90 90 0 0 1 75-88.65V45a15 15 0 1 1 30 0v16.35a88.492 88.492 0 0 1 19.5 6 59.883 59.883 0 0 0 27.267 75.64A59.887 59.887 0 0 0 270 150v90l30 30Zm-120 60a30 30 0 0 0 30-30h-60a30 30 0 0 0 30 30Z'
}

const path2 : PathProps = {
    d: 'M270 58.37a30 30 0 1 0 0 60 30 30 0 0 0 0-60Z'
}

const BellNotification : React.FC<IconProps> = (props) => {

    const { theme } = useTheme()

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
                    fill={theme.colors.lightGreen}
                    animated={true}
                    animatedProps={props.animatedPathProps}
                />
            </Svg>
        )
    }

    return (
        <Svg {...svg} size={props.size}>
            <Path {...path1} fill={props.color} />
            <Path {...path2} fill={theme.colors.lightGreen} />
        </Svg>
    )

}

export default BellNotification