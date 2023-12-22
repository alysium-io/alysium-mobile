import React from 'react'
import Animated from 'react-native-reanimated'


interface TabToggleContentProps {
    children: React.ReactNode;
    setScrollViewReady: () => void;
    scrollHandler: (event: any) => void;
    setContentRef: (ref: Animated.ScrollView) => void;
}

const TabToggleContent : React.FC<TabToggleContentProps> = ({
    children,
    setScrollViewReady,
    scrollHandler,
    setContentRef
}) => {

    return (
        <Animated.ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            onScroll={scrollHandler}
            ref={setContentRef}
            onLayout={setScrollViewReady}
        >
            { children }
        </Animated.ScrollView>
    )
}

export default TabToggleContent