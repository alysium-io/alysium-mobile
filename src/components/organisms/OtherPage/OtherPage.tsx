import React from 'react'
import { useAnimatedStyle } from 'react-native-reanimated'
import LinearGradient from 'react-native-linear-gradient'
import { View, Text } from '@atomic'
import { useNotchBlurHeader } from '@organisms'
import { useTheme } from '@hooks'
import { StyleSheet } from 'react-native'


const containerHeight = 200

interface OtherPageProps {
    children: React.ReactNode;
    title: string;
    dominantColor: string;
    NotchHeaderRightComponent?: React.FC;
}

const OtherPage: React.FC<OtherPageProps> = ({
    children,
    title,
    dominantColor,
    NotchHeaderRightComponent
}) => {

    const { theme } = useTheme()

    const { scrollY, NotchBlurHeader, ScrollView } = useNotchBlurHeader()

    const animatedContainerStyles = useAnimatedStyle(() => {
        return { height: containerHeight - scrollY.value }
	}, [])

    return (
        <View style={styles.container}>
            <View animated style={[styles.topBackground, animatedContainerStyles]}>
                <LinearGradient
                    colors={[dominantColor, theme.colors.bg1]}
                    style={styles.linearGradient}
                    start={{ x: 0.5, y: -0.1 }}
                    end={{ x: 0.5, y: 1 }}
                />
                <Text
                    numberOfLines={1}
                    ellipsizeMode='tail'
                    variant='h1'
                    marginLeft='m'
                >{ title }</Text>
            </View>
            <ScrollView
                contentContainerStyle={styles.scrollView}
                showsVerticalScrollIndicator={false}
            >
                <View style={[styles.bottomContainer, { backgroundColor: theme.colors.bg1 }]}>
                    { children }
                </View>
            </ScrollView>
            <NotchBlurHeader
                title={title}
                NotchHeaderRightComponent={NotchHeaderRightComponent}
                backgroundInterpolationRange={[0, 10]}
                backgroundColor='transparent'
                titleInterpolationRange={[50, 100]}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    topBackground: {
        height: containerHeight,
        width: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        justifyContent: 'flex-end',
    },
    scrollView: {
        flexGrow: 1,
        paddingTop: containerHeight
    },
    topContainer: {
        height: containerHeight,
        width: '100%',
        justifyContent: 'flex-end',
        paddingHorizontal: 25,
        paddingBottom: 25
    },
    linearGradient: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%'
    },
    bottomContainer: {
        flex: 1
    }
})

export default OtherPage