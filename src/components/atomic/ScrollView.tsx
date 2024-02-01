import React from 'react'
import {
  ScrollView as RNScrollView,
  ScrollViewProps,
  Keyboard
} from 'react-native'


const ScrollView = React.forwardRef<RNScrollView, ScrollViewProps>((props, ref) => {

    const _onScrollBeginDrag = () => {
        Keyboard.dismiss()
    }

    return (
        <RNScrollView
            ref={ref}
            onScrollBeginDrag={_onScrollBeginDrag}
            showsVerticalScrollIndicator={props.showsVerticalScrollIndicator || false}
            showsHorizontalScrollIndicator={props.showsHorizontalScrollIndicator || false}
            alwaysBounceVertical={props.alwaysBounceVertical || false}
            keyboardShouldPersistTaps='always'
            contentContainerStyle={{ flexGrow: 1 }}
            {...props}
        >
            {props.children}
        </RNScrollView>
    )
})

export default ScrollView