import React from 'react'
import { Icon, Text, View } from '@atomic'
import { TouchableWithoutFeedback, StyleSheet } from 'react-native'
import { useSettings } from '@hooks'


interface BasicListItemProps {
    title: string;
    subtitle: string;
    onPress: () => void;
    Profile?: React.FC;
}

const BasicListItem : React.FC<BasicListItemProps> = ({
    title,
    subtitle,
    onPress,
    Profile
}) => {

    const { theme } = useSettings()

    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View marginVertical='xs' style={styles.container}>
                {
                    Profile && (
                        <View style={styles.visualContainer}>
                            <Profile />
                        </View>
                    )
                }
                <View style={styles.titlesContainer} marginLeft='m'>
                    <Text variant='p1' numberOfLines={1}>{title}</Text>
                    <Text variant='secondaryP2' numberOfLines={1}>{subtitle}</Text>
                </View>
                <View style={styles.iconContainer}>
                    <Icon name='arrow' color={theme.colors.primaryText} size='50%' />
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 48
    },
    visualContainer: {
        width: 48,
        height: '100%'
    },
    titlesContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    iconContainer: {
        width: 24,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default BasicListItem