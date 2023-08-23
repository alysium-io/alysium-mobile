import React from 'react'
import { useSettings } from '@hooks'
import { View, Text, Icon, Image } from '@atomic'
import { StyleSheet, TouchableWithoutFeedback } from 'react-native'
import { BorderRadii, ContentType } from '@types'


interface ContentListItemProps {
    title: string;
    subtitle?: string;
    image: string | undefined;
    onPress: () => void;
    borderRadius?: keyof BorderRadii;
    contentType: ContentType;
}

const ContentListItem : React.FC<ContentListItemProps> = ({
    title,
    subtitle,
    image,
    onPress,
    contentType
}) => {

    const { theme } = useSettings()

    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View marginVertical='xs' marginHorizontal='m' style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: image }}
                        style={{ height: '100%', width: '100%' }}
                        variant={contentType}
                    />
                </View>
                <View marginLeft='m' style={styles.titlesContainer}>
                    <Text variant='text' numberOfLines={1}>{ title }</Text>
                    <Text variant='subtext' numberOfLines={1}>{ subtitle }</Text>
                </View>
                <View style={styles.iconContainer}>
                    <Icon name='arrow-right' size='35%' color={theme.colors.secondaryText} />
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center'
    },
    imageContainer: {
        height: '100%',
        width: 50
    },
    titlesContainer: {
        flex: 1
    },
    iconContainer: {
        height: '100%',
        width: 40,
        justifyContent: 'center',
        alignItems: 'flex-end'
    }
})

export default ContentListItem