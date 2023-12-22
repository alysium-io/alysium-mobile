import React, { useCallback } from 'react'
import { NativeScrollEvent, NativeSyntheticEvent } from 'react-native'
import { SharedValue, useSharedValue } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { ScrollView as RNScrollView } from 'react-native'
import NotchBlurHeaderComponent, { NotchBlurHeaderProps } from './NotchBlurHeader'

interface IUseNotchBlurHeader {
    scrollY: SharedValue<number>
    scrollEvent: (event: NativeSyntheticEvent<NativeScrollEvent>) => void
    headerHeight: number
    totalNotchHeaderContainerHeight: number
    ScrollView: React.FC<React.ComponentProps<typeof RNScrollView>>
    NotchBlurHeader: React.FC<Omit<NotchBlurHeaderProps, 'scrollY'>>
}

const useNotchBlurHeader = (headerHeight: number = 50) : IUseNotchBlurHeader => {

    const scrollY = useSharedValue<number>(0)
    const insets = useSafeAreaInsets()

    const scrollEvent = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
		scrollY.value = event.nativeEvent.contentOffset.y
	}

    const ScrollView : React.FC<React.ComponentProps<typeof RNScrollView>> = useCallback(({ children, ...props }) => {
        return (
            <RNScrollView
                scrollEventThrottle={16}
                onScroll={scrollEvent}
                keyboardShouldPersistTaps='always'
                contentContainerStyle={{ paddingTop: headerHeight + insets.top }}
                {...props}
            >
                {children}
            </RNScrollView>
        )
    }, [])

    const NotchBlurHeader : React.FC<Omit<NotchBlurHeaderProps, 'scrollY'>> = useCallback(({ ...props }) => {
        return (
            <NotchBlurHeaderComponent
                scrollY={scrollY}
                headerHeight={headerHeight + insets.top}
                {...props}
            />
        )
    }, [])
    
    return {
        scrollY,
        scrollEvent,
        headerHeight,
        totalNotchHeaderContainerHeight: headerHeight + insets.top,
        ScrollView,
        NotchBlurHeader
    }
}

export default useNotchBlurHeader