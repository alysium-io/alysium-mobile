import React from 'react'
import { View, Icon } from '@atomic'
import { useTheme } from '@hooks'
import { TouchableWithoutFeedback } from 'react-native'


interface MoreButtonProps {
    onPress?: () => void;
}

const MoreButton : React.FC<MoreButtonProps> = ({
    onPress
}) => {

    const { theme } = useTheme()

    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View>
                <Icon name='menu' size={25} color={theme.colors.t1} />
            </View>
        </TouchableWithoutFeedback>
    )
}

export default MoreButton