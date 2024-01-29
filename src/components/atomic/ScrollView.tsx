import React from 'react'
import {
    ScrollView as RNScrollView,
    ScrollViewProps,
    Keyboard
} from 'react-native'


const ScrollView : React.FC<ScrollViewProps> = (props) => {

    const _onScrollBeginDrag = () => {
        Keyboard.dismiss()
    }

    return (
        <RNScrollView
            onScrollBeginDrag={_onScrollBeginDrag}
            showsVerticalScrollIndicator={props.showsVerticalScrollIndicator || false}
            showsHorizontalScrollIndicator={props.showsHorizontalScrollIndicator || false}
            alwaysBounceVertical={props.alwaysBounceVertical || false}
            keyboardShouldPersistTaps='always'
            {...props}
        >
            {props.children}
        </RNScrollView>
    )
}

export default ScrollView