import React from 'react'
import { Text, View } from '@atomic'
import { StyleSheet } from 'react-native'
import { ContentType, ThemeMode } from '@types'
import { useBgTouchAnimation, useTheme } from '@hooks'
import ContentListItemToggleImage from './ContentListItemToggleImage'
import ContentListItemToggleTitle from './ContentListItemToggleTitle'
import ContentListItemToggleIcon from './ContentListItemToggleIcon'
import { Colors } from '@etc'


interface ContentListItemToggleProps {
    title: string
    subtitle: string
    rnk?: number
    onPressContent: () => void
    onPressToggle: () => void
    contentType: ContentType
    image: string | null
    size?: 'small' | 'medium' | 'large'
    border?: boolean
    subtitleFirst?: boolean
    borderRadius?: 'round' | 'sharp' | 'smooth' | number
    checked: boolean
}

const ContentListItemToggle : React.FC<ContentListItemToggleProps> = ({
    title,
    subtitle,
    rnk,
    onPressContent,
    onPressToggle,
    contentType,
    image,
    size = 'medium',
    border,
    subtitleFirst = false,
    borderRadius = 'round',
    checked
}) => {

    const { getRawColor, mode, theme } = useTheme()

    const { Touchable } = useBgTouchAnimation('transparent', Colors.RGBA2String(Colors.hex2RGBA(getRawColor('ion'), 0.1)))

    return (
        <Touchable onPress={onPressContent}>
            <View
                animated
                paddingHorizontal='m'
            >
                <View paddingVertical='s' style={[
                    styles.container,
                    {
                        borderBottomWidth: border ? 0.5 : 0,
                        borderBottomColor: mode === ThemeMode.dark ? theme.colors.ion_dark : theme.colors.ion
                    }
                ]}>
                    { rnk && <Text variant='paragraph-medium' marginRight='m'>{rnk}</Text> }
                    <ContentListItemToggleImage contentType={contentType} image={image} size={size} borderRadius={borderRadius} />
                    <ContentListItemToggleTitle title={title} subtitle={subtitle} subtitleFirst={subtitleFirst} />
                    <ContentListItemToggleIcon checked={checked} onPress={onPressToggle} />
                </View>
            </View>
        </Touchable>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center'
    }
})

export default ContentListItemToggle