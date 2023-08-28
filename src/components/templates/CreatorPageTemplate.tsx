import React from 'react'
import { Colors } from '@etc'
import { interpolate, useAnimatedStyle, useSharedValue } from 'react-native-reanimated'
import { useSettings } from '@hooks'
import { AnimatedNotchBlurHeader } from '@molecules'
import { Text, View, LinearGradient, Image } from '@atomic'
import FastImage from 'react-native-fast-image'
import {
    StyleSheet,
    Dimensions,
    NativeSyntheticEvent,
    NativeScrollEvent,
    ScrollView
} from 'react-native'

const { height } = Dimensions.get('window')

// This is the size of the image container, not the size of the image itself, the actual image will be slightly larger
export const TOP_CONTAINER_HEIGHT = height * 0.35 // 35% of the screen height
export const TOP_TEXT_CONTAINER_HEIGHT = TOP_CONTAINER_HEIGHT * 0.3 // 30% of the top container height
export const IMAGE_CONTAINER_HEIGHT = TOP_CONTAINER_HEIGHT * 1.2 // 120% of the top container height
export const LARGE_TITLE_SIZE = TOP_TEXT_CONTAINER_HEIGHT * 0.5 // 50% of the top text container height
export const LARGE_SUBTITLE_SIZE = TOP_TEXT_CONTAINER_HEIGHT * 0.25 // 20% of the top text container height

interface CreatorPageTemplateProps {
    children?: React.ReactNode;
    image: string;
    title: string;
    subtitle?: string;
    dominantColor: string;
}

const CreatorPageTemplate: React.FC<CreatorPageTemplateProps> = ({
    children,
    image,
    title,
    subtitle,
    dominantColor
}) => {

    const { theme } = useSettings()

    const scrollY = useSharedValue<number>(0)

	const scrollEvent = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
		scrollY.value = event.nativeEvent.contentOffset.y
	}

    const animatedTitleStyles = useAnimatedStyle(() => {
		if(scrollY.value > 0) {
            // If we're pulling down
			return { opacity: interpolate(scrollY.value, [0, IMAGE_CONTAINER_HEIGHT], [1, 0], 'clamp') }
		} else {
            // If we're pushing up
			return { opacity: interpolate(scrollY.value, [0, -100], [1, 0], 'clamp') }
		}
	})

    const animatedImageStyles = useAnimatedStyle(() => {
		// If we're scrolling down
		if(scrollY.value > 0) {
			// Do a slight interpolation to make the image scale down
			return {
				height: interpolate(scrollY.value, [0, IMAGE_CONTAINER_HEIGHT], [IMAGE_CONTAINER_HEIGHT, IMAGE_CONTAINER_HEIGHT - 100], 'clamp'),
				opacity: interpolate(scrollY.value, [0, IMAGE_CONTAINER_HEIGHT], [1, 0.5], 'clamp')
			}
		} else {
			// If we're overflowing the scroll up, then increase the height of the image by the number of overflowed pixels
			return { height: IMAGE_CONTAINER_HEIGHT + Math.abs(scrollY.value) }
		}
	})

    const animatedLinearGradientBackgroundStyle = useAnimatedStyle(() => {
        return { opacity: interpolate(scrollY.value, [0, 300], [0, 0.25], 'clamp') }
    })

    const Header = () => (
        <View animated style={[styles.topContainer, animatedTitleStyles]}>
            <LinearGradient
                colors={['rgba(51, 51, 51, 0)', 'rgba(0, 0, 0, 0.8)']}
                style={[styles.titleGradientContainer]}
            >
                <Text
                    variant='header'
                    numberOfLines={1}
                    ellipsizeMode='tail'
                >{ title }</Text>
                {
                    subtitle && (
                        <Text
                            variant='subheader'
                            numberOfLines={1}
                            ellipsizeMode='tail'
                            marginLeft='xs'
                        >{ subtitle }</Text>
                    )
                }
            </LinearGradient>
        </View>
    )

    const Body = () => (
        <View style={[styles.bottomContainer, { backgroundColor: theme.colors.primaryBg }]}>
            <LinearGradient
                colors={[Colors.hexToRGBA(dominantColor, 0.15), 'transparent']}
                style={styles.imgShadowGradient}
            />
            <LinearGradient
                colors={[Colors.hexToRGBA(dominantColor, 0.1), theme.colors.primaryBg]}
                start={{ x: 1, y: -1 }}
                end={{ x: 0, y: 1 }}
                animated
                style={[
                    styles.mainContentBackgroundGradient,
                    animatedLinearGradientBackgroundStyle
                ]}
            />
            { children }
        </View>
    )

    return (
        <View style={styles.container}>
            <AnimatedNotchBlurHeader
                scrollY={scrollY}
                title={title}
                subtitle={subtitle}
            />
            <View animated style={[styles.imageContainer, animatedImageStyles]}>
                <Image
                    style={styles.image}
                    source={{
                        uri: image,
                        priority: FastImage.priority.high
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                />
			</View>
            <ScrollView
                contentContainerStyle={styles.scrollView}
                showsVerticalScrollIndicator={false}
                onScroll={scrollEvent} 
                scrollEventThrottle={16}
                keyboardShouldPersistTaps='always'
            >
                <Header />
                <Body />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    scrollView: {
        overflow: 'visible',
        flexGrow: 1
    },
    topContainer: {
        height: TOP_CONTAINER_HEIGHT,
        width: '100%'
    },
    titleGradientContainer: {
        position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		height: TOP_TEXT_CONTAINER_HEIGHT,
		paddingHorizontal: 25,
		justifyContent: 'center',
		backgroundColor: 'transparent'
    },
    imageContainer: {
        position: 'absolute',
		top: 0,
		left: 0,
		height: IMAGE_CONTAINER_HEIGHT,
		width: '100%'
    },
    image: {
        height: '100%',
		width: '100%'
    },
    bottomContainer: {
        flex: 1
    },
    imgShadowGradient: {
        position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		height: 100,
        width: '100%'
    },
    mainContentBackgroundGradient: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        width: '100%'
    }
})

export default CreatorPageTemplate