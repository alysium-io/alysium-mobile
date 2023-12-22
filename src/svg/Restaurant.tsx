import React from 'react'
import { IconProps } from '@types'
import { Svg, Path } from '@atomic'
import { PathProps, SvgProps } from 'react-native-svg'


const svg : SvgProps = {
    viewBox: '0 0 18 18',
    fill: 'none'
}

const path : PathProps = {
    d: 'm9.817 11.321 1.375-1.39a.19.19 0 0 1 .209-.04c.473.204.996.258 1.496.162.483-.094.946-.33 1.319-.707l3.209-3.245a.385.385 0 0 0-.268-.654.377.377 0 0 0-.268.112l-2.757 2.786a.189.189 0 0 1-.268 0l-.732-.74a.194.194 0 0 1 0-.271l2.756-2.787a.387.387 0 0 0 0-.543.377.377 0 0 0-.536.001l-2.757 2.787a.189.189 0 0 1-.268-.001l-.732-.74a.194.194 0 0 1 0-.27l2.757-2.787a.385.385 0 0 0 .11-.271.384.384 0 0 0-.11-.272.377.377 0 0 0-.536 0l-3.21 3.245a2.572 2.572 0 0 0-.7 1.334c-.094.5-.042 1.025.156 1.499a.194.194 0 0 1-.035.224l-5.415 5.474a.835.835 0 0 0-.24.59c-.001.212.08.426.24.589.16.162.371.242.583.242a.815.815 0 0 0 .572-.232l2.627-2.656 1.423-1.439ZM8.793 12.9l2.49 2.519a.818.818 0 0 0 1.166 0 .843.843 0 0 0 .01-1.168l-2.5-2.529L8.792 12.9Zm-1.702-1.72L8.256 10 6.882 8.61a.195.195 0 0 1-.043-.205c.225-.582.239-1.265.053-1.944a4.358 4.358 0 0 0-1.118-1.896C5.058 3.842 4.18 3.42 3.34 3.326c-.825-.093-1.613.13-2.168.691-.554.56-.775 1.357-.683 2.191.093.85.51 1.738 1.225 2.462A4.299 4.299 0 0 0 3.591 9.8c.666.186 1.335.174 1.907-.048a.188.188 0 0 1 .218.037l1.375 1.39Zm-1.327-2.52a.188.188 0 0 1-.268 0 .193.193 0 0 1 0-.27c.203-.206.32-.474.359-.774.04-.325-.01-.687-.145-1.05a.192.192 0 0 1 .11-.247.189.189 0 0 1 .244.111c.157.422.214.847.166 1.233-.049.385-.202.73-.466.997Zm-3.77-3.812a.189.189 0 0 1-.269 0 .194.194 0 0 1 0-.271c.415-.42 1.021-.563 1.665-.453.62.107 1.28.45 1.828 1.005a.194.194 0 0 1 0 .27.188.188 0 0 1-.268 0c-.492-.497-1.077-.804-1.623-.897-.523-.09-1.01.018-1.334.346Z'
}

const Restaurant : React.FC<IconProps> = (props) => {

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

export default Restaurant