import React from 'react'
import { Icon, Text } from '@atomic'
import { ContentType } from '@types'
import { useTheme } from '@hooks'
import {
    HorizontalListItemContainer,
    ListItemProfile,
    TextContainer,
    IconContainer
} from '@molecules'


interface UserWithUsernameListItemProps {
    image: string
    name: string
    username: string
    onPress: () => void
}

const UserWithUsernameListItem : React.FC<UserWithUsernameListItemProps> = ({
    image,
    name,
    username,
    onPress
}) => {

    const { theme } = useTheme()

    return (
        <HorizontalListItemContainer>
            <ListItemProfile
                contentType={ContentType.user}
                image={image}
                onPress={onPress}
            />
            <TextContainer border='regular' onPress={onPress}>
                <Text marginBottom='xs' variant='p2-bold'>{name}</Text>
                <Text variant='p4-secondary-bold'>{username}</Text>
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

export default UserWithUsernameListItem