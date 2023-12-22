import React from 'react'
import { Icon, Text } from '@atomic'
import { HorizontalListItemContainer, TextContainer, IconContainer } from '@molecules'
import { IconNames } from '@svg'
import { useTheme } from '@hooks'


interface IconInteractiveListItemProps {
    icon: IconNames
    text: string
    onPress: () => void
}

const IconInteractiveListItem : React.FC<IconInteractiveListItemProps> = ({
    icon,
    text,
    onPress
}) => {

    const { theme } = useTheme()

    return (
        <HorizontalListItemContainer height={53} border='regular'>
            <IconContainer onPress={onPress}>
                <Icon
                    name={icon}
                    direction='right'
                    color={theme.colors.t1}
                    size={15}
                />
            </IconContainer>
            <TextContainer onPress={onPress} containerProps={{ marginLeft: 'xs' }}>
                <Text marginBottom='xs' variant='p3-light'>{text}</Text>
            </TextContainer>
            <IconContainer onPress={onPress}>
                <Icon
                    name='arrow'
                    direction='right'
                    color={theme.colors.t1}
                    size={18}
                />
            </IconContainer>
        </HorizontalListItemContainer>
    )
}

export default IconInteractiveListItem