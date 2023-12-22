import React from 'react'
import { Svg, Path } from '@atomic'
import { IconProps } from '@types'
import { PathProps, SvgProps } from 'react-native-svg'


const svg : SvgProps = {
    viewBox:'0 0 18 18',
    fill:'none'
}

const path1 : PathProps = {
    d: 'M9.824 14.728a.818.818 0 1 1-1.636 0 .818.818 0 0 1 1.636 0Z'
}

const path2 : PathProps = {
    fillRule: 'evenodd',
    d: 'M6.738 0H11.455l.04.001a3.273 3.273 0 0 1 3.224 3.04c.01.116.009.247.009.423v9.8c0 .67 0 1.223-.037 1.673-.04.467-.123.897-.331 1.299a3.272 3.272 0 0 1-1.396 1.396c-.402.208-.832.292-1.3.33-.45.038-1.002.038-1.672.038H8.01c-.67 0-1.222 0-1.672-.037-.468-.04-.897-.123-1.3-.331a3.273 3.273 0 0 1-1.395-1.396c-.209-.402-.292-.832-.331-1.3-.038-.45-.038-1.002-.038-1.672v-9.8c0-.176 0-.307.009-.424A3.273 3.273 0 0 1 6.546 0h.192Zm.03 1.636c-.22 0-.287 0-.338.005a1.636 1.636 0 0 0-1.516 1.516c-.004.05-.004.118-.004.338v9.735c0 .713 0 1.197.032 1.571.03.365.085.55.152.68.155.3.399.543.698.698.13.068.316.123.68.153.374.031.859.032 1.571.032h1.915c.713 0 1.197-.001 1.571-.032.365-.03.55-.085.68-.153.3-.155.543-.399.698-.697.068-.13.123-.316.153-.68.031-.375.032-.86.032-1.572V3.495c0-.22 0-.288-.005-.338a1.636 1.636 0 0 0-1.516-1.516 5.765 5.765 0 0 0-.403-.004.409.409 0 0 0-.278.123 2.21 2.21 0 0 0-.043.049l-.4.444-.01.011-.027.028a.86.86 0 0 1-.605.253H8.197a.962.962 0 0 1-.213-.027.86.86 0 0 1-.419-.254l-.01-.011-.4-.444a2.322 2.322 0 0 0-.044-.049.409.409 0 0 0-.278-.123h-.065Z',
    clipRule: 'evenodd'
}

const Mobile : React.FC<IconProps> = (props) => {

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

export default Mobile