import React from 'react'
import { Svg, Path } from '@atomic'
import { SvgProps, PathProps } from 'react-native-svg'
import { IconProps } from '@types'


const svg : SvgProps = {
    viewBox: '0 0 18 18',
    fill: 'none'
}

const path : PathProps = {
    d: 'm16.733 4.227-5.029-2.188-.023-.006a.427.427 0 0 0-.057-.018c-.018-.004-.037-.009-.055-.01-.018-.003-.036-.003-.057-.003-.018 0-.037 0-.057.002-.018.002-.037.007-.055.011-.018.004-.039.009-.057.018l-.023.006-4.834 2.105-4.84-2.105a.474.474 0 0 0-.436.03.435.435 0 0 0-.21.368v10.938c0 .17.105.328.267.398l5.029 2.188c.014.006.027.008.041.013a.498.498 0 0 0 .149.026.498.498 0 0 0 .114-.015c.011-.002.023-.007.034-.011.014-.005.028-.007.041-.013l4.84-2.105 4.838 2.105a.473.473 0 0 0 .437-.03c.13-.082.21-.22.21-.368V4.624a.438.438 0 0 0-.267-.398Zm-5.676 8.866-4.114 1.79V4.906l4.114-1.79v9.976Z'
}

const Location : React.FC<IconProps> = (props) => {

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

export default Location