import React from 'react'
import { BlurView, View, Text, NotchMargin } from '@atomic'
import { BackButton } from '@molecules'
import { SharedValue, interpolate, useAnimatedStyle } from 'react-native-reanimated'
import { StyleSheet } from 'react-native'
import { useTheme } from '@hooks'


export interface NotchBlurHeaderProps {
    title?: string
    scrollY: SharedValue<number>
    NotchHeaderRightComponent?: React.FC<any>
    NotchHeaderLeftComponent?: React.FC<any> | null
    titleInterpolationRange?: [number, number]
    backgroundInterpolationRange?: [number, number]
    headerHeight?: number
    backgroundColor?: string
    border?: boolean
}

const NotchBlurHeader : React.FC<NotchBlurHeaderProps> = ({
    title,
    scrollY,
    NotchHeaderRightComponent,
    NotchHeaderLeftComponent,
    titleInterpolationRange = [220, 270],
    backgroundInterpolationRange = [100, 220],
    headerHeight = 50,
    backgroundColor = 'bg1',
    border = true
}) => {

    const { theme } = useTheme()

    const animatedCenterContentContainerStyle = useAnimatedStyle(() => {
        return { opacity: interpolate(scrollY.value, titleInterpolationRange, [0, 1], 'clamp') }
    }, [])

    const animatedBackgroundStyle = useAnimatedStyle(() => {
        return { opacity: interpolate(scrollY.value, backgroundInterpolationRange, [1, 0], 'clamp')}
    }, [])

    return (
        <View style={[
            styles.container,
            { height: headerHeight },
            border && theme.borders.thin.bottom
        ]}>
            <BlurView style={styles.background} blurAmount={25} />
            <View animated style={[ styles.background, animatedBackgroundStyle ]} backgroundColor={backgroundColor} />
            <NotchMargin />
            <View style={styles.contentContainer} paddingHorizontal='l'>
                <View style={styles.leftContentContainer}>
                    {
                        NotchHeaderLeftComponent ?
                        <NotchHeaderLeftComponent /> :
                        NotchHeaderLeftComponent === null ?
                        null :
                        <BackButton />
                    }
                </View>
                <View animated style={[ styles.centerContentContainer, animatedCenterContentContainerStyle ]}>
                    <Text variant='paragraph'>{title}</Text>
                </View>
                <View style={styles.rightContentContainer}>
                    { NotchHeaderRightComponent && <NotchHeaderRightComponent /> }
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        zIndex: 999,
        position: 'absolute',
        top: 0,
        width: '100%'
    },
    background: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '100%',
        width: '100%'
    },
    contentContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    leftContentContainer: {
        flex: 1,
        alignItems: 'flex-start'
    },
    centerContentContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    rightContentContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    }
})

export default NotchBlurHeader