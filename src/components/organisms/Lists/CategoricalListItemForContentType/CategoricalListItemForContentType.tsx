import React from 'react'
import { View, Icon } from '@atomic'
import { ContentType, ThemeMode } from '@types'
import CategoricalListItemForContentTypeImage from './CategoricalListItemForContentTypeImage'
import CategoricalListItemForContentTypeTitle from './CategoricalListItemForContentTypeTitle'
import { StyleSheet, TouchableWithoutFeedback } from 'react-native'
import { useTheme, useBgTouchAnimation } from '@hooks'
import { Colors } from '@etc'


interface CategoricalListItemForContentTypeProps {
    contentType: ContentType.artist | ContentType.host | ContentType.tag | ContentType.location
    title: string
    subtitle: string
    onPress: () => void
}

const CategoricalListItemForContentType : React.FC<CategoricalListItemForContentTypeProps> = ({
    contentType,
    title,
    subtitle,
    onPress
}) => {

    const { mode, theme, getRawColor } = useTheme()
    
    const {
        animatedBgStyles,
        onPressIn,
        onPressOut
    } = useBgTouchAnimation('transparent', Colors.RGBA2String(Colors.hex2RGBA(getRawColor('ion'), 0.1)))

    return (
        <TouchableWithoutFeedback onPress={onPress} onPressIn={onPressIn} onPressOut={onPressOut}>
            <View
                animated
                paddingHorizontal='m'
                style={animatedBgStyles}
            >
                <View paddingVertical='s' style={[
                    styles.container,
                    {
                        borderBottomWidth: 0.5,
                        borderBottomColor: mode === ThemeMode.dark ? theme.colors.ion_dark : theme.colors.ion
                    }
                ]}>
                    <CategoricalListItemForContentTypeImage contentType={contentType} />
                    <CategoricalListItemForContentTypeTitle title={title} subtitle={subtitle} />
                    <Icon name='arrow-right' color='ion' size='small' />
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center'
    }
})

export default CategoricalListItemForContentType