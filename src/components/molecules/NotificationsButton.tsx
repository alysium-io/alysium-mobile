import React from 'react'
import { Icon, View } from '@atomic'
import { TouchableWithoutFeedback } from 'react-native'
import { useTheme } from '@hooks'


interface NotificationsButtonProps {
    onPress: () => void;
}

const NotificationsButton : React.FC<NotificationsButtonProps> = ({
    onPress
}) => {

    const { theme } = useTheme()

    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View marginRight='m'>
                <Icon name='bell' size={25} color={theme.colors.t1} />
            </View>
        </TouchableWithoutFeedback>
    )
}

export default NotificationsButton