import React from 'react'
import { BlurView, View, Text, Icon } from '@atomic'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useAnimatedStyle, interpolate, SharedValue } from 'react-native-reanimated'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { StyleSheet } from 'react-native'
import { useNavigation } from '@hooks'


interface AnimatedNotchBlurHeaderProps {
    scrollY: SharedValue<number>;
    title?: string;
    subtitle?: string;
}

const AnimatedNotchBlurHeader : React.FC<AnimatedNotchBlurHeaderProps> = ({
    scrollY,
    title,
    subtitle
}) => {

    const insets = useSafeAreaInsets()
    const { back } = useNavigation()

    const animatedNotchBlurStyle = useAnimatedStyle(() => {
        return {
            height: interpolate(
                scrollY.value,
                [0, 200],
                [insets.top, insets.top + 60],
                'clamp'
            )
        }
    })

    const animatedContentContainerStyle = useAnimatedStyle(() => {
        return {
            height: interpolate(
                scrollY.value,
                [0, 200],
                [insets.top, 60],
                'clamp'
            ),
            marginTop: interpolate(
                scrollY.value,
                [0, 200],
                [0, insets.top],
                'clamp'
            ),
            opacity: interpolate(
                scrollY.value,
                [0, 150, 200],
                [0, 0.2, 1],
                'clamp'
            )
        }
    })

    const animatedLeftContentStyle = useAnimatedStyle(() => {
        return {
            left: interpolate(
                scrollY.value,
                [0, 175, 200],
                [15, 10, 0],
                'clamp'
            )
        }
    })

    return (
        <View style={styles.container}>
            <BlurView
                animated
                style={[
                    styles.blur,
                    animatedNotchBlurStyle
                ]}
            />
            <View animated style={[styles.contentContainer, animatedContentContainerStyle]} marginHorizontal='m'>
                <View animated style={[styles.leftContainer, animatedLeftContentStyle]}>
                    <TouchableWithoutFeedback onPress={back}>
                        <Icon
                            name='arrow'
                            size={14}
                            color='white'
                            direction='left'
                        />
                    </TouchableWithoutFeedback>
                </View>
                <View style={styles.centerContainer}>
                    { title && <Text variant='h6' style={styles.title} numberOfLines={1}>{title}</Text> }
                    { subtitle && <Text variant='secondaryP6' numberOfLines={1}>{subtitle}</Text> }
                </View>
                <View style={styles.rightContainer}></View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 999
    },
    blur: {
        position: 'absolute',
        height: '100%',
        width: '100%'
    },
    contentContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    leftContainer: {
        height: '100%',
        justifyContent: 'center',
        flex: 1
    },
    centerContainer: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    rightContainer: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    title: {
        marginBottom: 4
    }
})

export default AnimatedNotchBlurHeader