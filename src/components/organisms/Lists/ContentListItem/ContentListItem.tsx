import React from 'react'
import { Text, View } from '@atomic'
import { ContentType, Persona, ThemeMode } from '@types'
import { Colors } from '@etc'
import { useBgTouchAnimation, useTheme } from '@hooks'
import ContentListItemTitle from './ContentListItemTitle'
import ContentListItemImage from './ContentListItemImage'
import ContentListItemIcon from './ContentListItemIcon'
import ContentListItemMarker from './ContentListItemMarker'
import { IconNames } from '@svg'
import { StyleSheet } from 'react-native'


interface ContentListItemProps {
    title: string
    subtitle: string
    rnk?: number
    onPress: () => void
    contentType: ContentType | Persona
    image: string | null
    size?: 'small' | 'medium' | 'large'
    border?: boolean
    icon?: 'arrow' | 'menu'
    onPressMenu?: () => void
    subtitleFirst?: boolean
    borderRadius?: 'round' | 'sharp' | 'smooth' | number
    marker?: IconNames
}

const ContentListItem : React.FC<ContentListItemProps> = ({
    title,
    subtitle,
    rnk,
    onPress,
    contentType,
    image,
    size = 'medium',
    border,
    icon = 'arrow',
    onPressMenu,
    subtitleFirst = false,
    borderRadius = 'round',
    marker
}) => {

    const { getRawColor, mode, theme } = useTheme()

    const { Touchable } = useBgTouchAnimation('transparent', Colors.RGBA2String(Colors.hex2RGBA(getRawColor('ion'), 0.1)))

    return (
        <Touchable onPress={onPress}>
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
                    <ContentListItemImage contentType={contentType} image={image} size={size} borderRadius={borderRadius} />
                    <ContentListItemTitle title={title} subtitle={subtitle} subtitleFirst={subtitleFirst} />
                    { marker && <ContentListItemMarker icon={marker} /> }
                    <ContentListItemIcon type={icon} onPress={onPressMenu} />
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

export default ContentListItem