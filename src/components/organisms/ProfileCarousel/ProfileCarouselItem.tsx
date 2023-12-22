import React from 'react'
import { Avatar, Text, View } from '@atomic'
import { useTheme } from '@hooks'
import { ContentType } from '@types'
import { ToggleButton } from '@molecules'
import {
    TouchableWithoutFeedback,
    StyleSheet
} from 'react-native'


interface ProfileCarouselItemProps {
    image: string;
    name: string;
    subheader: string;
    onPress: () => void;
    onPressButton: () => void;
}

const ProfileCarouselItem : React.FC<ProfileCarouselItemProps> = ({
    image,
    name,
    subheader,
    onPress,
    onPressButton
}) => {

    const { theme } = useTheme()

    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View
                marginRight='xs'
                style={[
                    styles.container,
                    {
                        backgroundColor: theme.colors.bg2
                    }
                ]}
            >
                <Avatar contentType={ContentType.artist} image={image} style={{ width: '35%', height: 'auto' }} />
                <View alignItems='center'>
                    <Text
                        variant='p3-bold'
                        marginBottom='xs'
                        numberOfLines={1}
                        style={styles.text}
                    >{ name }</Text>
                    <Text
                        variant='p4'
                        color='t2'
                        numberOfLines={1}
                        style={styles.text}
                    >{ subheader }</Text>
                </View>
                <ToggleButton
                    inactiveText='following'
                    activeText='follow'
                    onPress={onPressButton}
                />
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 150,
        height: 175,
        borderRadius: 2,
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    text: {
        maxWidth: '80%'
    }
})

export default ProfileCarouselItem