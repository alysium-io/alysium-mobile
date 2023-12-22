import React from 'react'
import { Text, View } from '@atomic'
import { TouchableWithoutFeedback } from 'react-native'


interface StatsItemProps {
    title: string
    subtitle: string
    onPress: () => void
}

const StatsItem : React.FC<StatsItemProps> = ({
    title,
    subtitle,
    onPress
}) => {

    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View alignItems='center'>
                <Text
                    variant='paragraph-medium'
                    marginBottom='xs'
                >{title}</Text>
                <Text
                    variant='paragraph-small'
                    color='t1'
                >{subtitle}</Text>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default StatsItem