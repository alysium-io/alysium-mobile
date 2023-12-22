import React, { useMemo } from 'react'
import { View } from '@atomic'
import { StackCardInterpolationProps } from '@react-navigation/stack'
import HeaderBackground from './HeaderBackground'
import { useHeader } from '@organisms'
import { Animated, StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'


interface HeaderWrapperProps {
    children: React.ReactNode
    cardAnimationProps: StackCardInterpolationProps
}

const HeaderWrapper : React.FC<HeaderWrapperProps> = ({
    children,
    cardAnimationProps
}) => {
    
    const { totalHeaderHeight, headerHeight } = useHeader()
    const insets = useSafeAreaInsets()

    const animatedStyle = useMemo(() => {
        return {
            opacity: cardAnimationProps.current.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1]
            })
        }
    }, [])

    return (
        <Animated.View style={[
            animatedStyle,
            styles.container,
            { height: totalHeaderHeight }
        ]}>
            <HeaderBackground />
            <View
                flexDirection='row'
                style={{
                    height: headerHeight,
                    marginTop: insets.top
                }}
            >
                {children}
            </View>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 999
    },
    background: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        width: '100%'
    }
})

export default HeaderWrapper