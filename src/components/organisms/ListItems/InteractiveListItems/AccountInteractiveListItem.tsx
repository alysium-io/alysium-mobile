import React from 'react'
import { Icon, Text } from '@atomic'
import { useTheme } from '@hooks'
import { ContentType } from '@types'
import {
    HorizontalListItemContainer,
    ListItemProfile,
    TextContainer,
    IconContainer
} from '@molecules'


interface AccountInteractiveListItemProps {
    title: string
    image: string
    contentType: ContentType
    onPress: () => void
}

const AccountInteractiveListItem : React.FC<AccountInteractiveListItemProps> = ({
    title,
    image,
    contentType,
    onPress
}) => {

    const { theme } = useTheme()

    return (
        <HorizontalListItemContainer height={60}>
            <ListItemProfile
                contentType={contentType}
                image={image}
                onPress={onPress}
            />
            <TextContainer border='regular' onPress={onPress}>
                <Text marginBottom='xs' variant='p3'>{title}</Text>
                <Text variant='p5-secondary'>{contentType}</Text>
            </TextContainer>
            <IconContainer border='regular' onPress={onPress}>
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

export default AccountInteractiveListItem