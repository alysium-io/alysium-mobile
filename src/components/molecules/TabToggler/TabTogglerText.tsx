import React from 'react'
import { Text, View } from '@atomic'
import { TouchableWithoutFeedback } from 'react-native'


interface TabTogglerTextProps {
    text: string
    isActive: boolean
    onPress: () => void
}

const TabTogglerText : React.FC<TabTogglerTextProps> = ({
    text,
    isActive,
    onPress
}) => {

    const getProps = () => {
        if (isActive) {
            return {
                variant: 'paragraph-small-bold',
                color: 't1'
            }
        } else {
            return {
                variant: 'paragraph-small',
                color: 'bg1'
            }
        }
    }

    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View flex={1}>
                <Text {...getProps()} margin='s' textAlign='center'>{text}</Text>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default TabTogglerText