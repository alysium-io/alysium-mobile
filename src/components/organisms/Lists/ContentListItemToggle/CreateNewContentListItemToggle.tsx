import React from 'react'
import { BgTouchAnimation, View } from '@atomic'
import { ThemeMode } from '@types'
import { useTheme } from '@hooks'
import ContentListItemToggleTitle from './ContentListItemToggleTitle'
import ContentListItemToggleImageIcon from './ContentListItemToggleImageIcon'
import ContentListItemToggleCustomIcon from './ContentListItemToggleCustomIcon'
import { Colors } from '@etc'
import { StyleSheet } from 'react-native'
import { IconNames } from '@svg'


interface CreateNewContentListItemToggleProps {
    title: string
    subtitle: string
    onPress: () => void
    size?: 'small' | 'medium' | 'large'
    border?: boolean
    subtitleFirst?: boolean
    icon: IconNames
}

const CreateNewContentListItemToggle : React.FC<CreateNewContentListItemToggleProps> = ({
    title,
    subtitle,
    onPress,
    size = 'medium',
    subtitleFirst = false,
    icon
}) => {

    const { getRawColor, mode, theme } = useTheme()

    return (
        <BgTouchAnimation color={Colors.RGBA2String(Colors.hex2RGBA(getRawColor('ion'), 0.1))} animationType='highlight' onPress={onPress}>
            <View paddingHorizontal='m'>
                <View paddingVertical='s' style={[
                    styles.container,
                    {
                        borderBottomWidth: 0.3,
                        borderBottomColor: mode === ThemeMode.dark ? theme.colors.ion_dark : theme.colors.ion
                    }
                ]}>
                    <ContentListItemToggleImageIcon size={size} icon={icon} />
                    <ContentListItemToggleTitle title={title} subtitle={subtitle} subtitleFirst={subtitleFirst} />
                    <ContentListItemToggleCustomIcon icon='arrow-right' />
                </View>
            </View>
        </BgTouchAnimation>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center'
    }
})

export default CreateNewContentListItemToggle