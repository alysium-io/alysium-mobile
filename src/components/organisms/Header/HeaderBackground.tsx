import React, { useMemo } from 'react'
import { BlurView, LinearGradient, View } from '@atomic'
import { Colors } from '@etc'
import { StyleSheet } from 'react-native'
import { ThemeMode } from '@types'
import { useTheme } from '@hooks'
import { useHeader } from '@organisms'


const HeaderBackground = () => {

    const { mode, getRawColor } = useTheme()
    const { totalHeaderHeight } = useHeader()

    const backgroundStyle = useMemo(() => {
        return [
            styles.background,
            { height: totalHeaderHeight }
        ]
    }, [totalHeaderHeight])

    return (
        <>
            <LinearGradient
                colors={[getRawColor('bg1'), Colors.RGBA2String(Colors.hex2RGBA(getRawColor('bg1'), 0.7))]}
                style={backgroundStyle}
            />
            <BlurView
                blurAmount={25}
                blurType={mode === ThemeMode.dark ? 'dark' : 'xlight'}
                style={backgroundStyle}
            />
            <View
                style={[
                    backgroundStyle,
                    {
                        borderBottomWidth: 0.5,
                        borderBottomColor: Colors.brighten(getRawColor('bg1'), 0.1)
                    }
                ]}
            />
        </>
    )
}

const styles = StyleSheet.create({
    background: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        width: '100%'
    }
})

export default HeaderBackground