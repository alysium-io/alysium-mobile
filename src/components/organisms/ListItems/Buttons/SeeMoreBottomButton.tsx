import React from 'react'
import { Icon, View, Text } from '@atomic'
import { useTheme } from '@hooks'
import {
    HorizontalListItemContainer,
    TextContainer,
    IconContainer
} from '@molecules'


interface SeeMoreBottomButtonProps {
    quantity: number
    onPress: () => void
}

const SeeMoreBottomButton : React.FC<SeeMoreBottomButtonProps> = ({
    quantity,
    onPress
}) => {

    const { theme } = useTheme()

    return (
        <HorizontalListItemContainer border='regular' height={50}>
            <TextContainer border='regular' onPress={onPress} containerProps={{ marginLeft: 'none' }}>
                <View flexDirection='row'>
                    <Text variant='p4'>See </Text>
                    <Text variant='p4-bold'>{quantity} more </Text>
                </View>
            </TextContainer>
            <IconContainer border='regular' onPress={onPress}>
                <Icon
                    name='arrow'
                    direction='right'
                    color={theme.colors.t1}
                    size={13}
                />
            </IconContainer>
        </HorizontalListItemContainer>
    )
}

export default SeeMoreBottomButton