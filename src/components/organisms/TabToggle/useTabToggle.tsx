import { useEffect, useState, useRef } from 'react'
import Animated, { useSharedValue, SharedValue, withTiming, useAnimatedScrollHandler } from 'react-native-reanimated'
import { Dimensions } from 'react-native'

const { width: containerWidth } = Dimensions.get('window')


interface IUseTabToggle {
    animatedValue: SharedValue<number>;
    onPressTab: (index: number) => void;
    isScrollViewReady: boolean;
    setIsScrollViewReady: (value: boolean) => void;
    setScrollViewReady: () => void;
    scrollHandler: (event: any) => void;
    setContentRef: (ref: Animated.ScrollView) => void;
}

const useTabToggle = (defaultTabIndex: number = 0) : IUseTabToggle => {

    const animatedValue = useSharedValue<number>(defaultTabIndex)
    const contentRef = useRef<Animated.ScrollView | null>(null)
    const [isScrollViewReady, setIsScrollViewReady] = useState(false)
    const setScrollViewReady = () => setIsScrollViewReady(true)

    useEffect(() => {
        if (isScrollViewReady) {
            contentRef.current?.scrollTo({ x: defaultTabIndex * containerWidth, animated: false });
        }
    }, [isScrollViewReady])

    const onPressTab = (index: number) => {
        animatedValue.value = withTiming(index, { duration: 200 })
        contentRef.current?.scrollTo({ x: index * containerWidth, animated: true })
    }

    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
            animatedValue.value = event.contentOffset.x / containerWidth
        }
    }, [containerWidth])

    const setContentRef = (ref: Animated.ScrollView) => contentRef.current = ref

    return {
        animatedValue,
        onPressTab,
        isScrollViewReady,
        setIsScrollViewReady,
        setScrollViewReady,
        scrollHandler,
        setContentRef
    }
    
}

export default useTabToggle