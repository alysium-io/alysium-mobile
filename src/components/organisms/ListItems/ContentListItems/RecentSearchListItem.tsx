import React from 'react'
import { Icon, Text } from '@atomic'
import { useTheme } from '@hooks'
import {
    HorizontalListItemContainer,
    TextContainer,
    IconContainer,
    ListItemProfile
} from '@molecules'


interface RecentSearchListItemProps {
    contentType: string
    image: string
    name: string
    onPressDelete: () => void
    onPress: () => void
}

const RecentSearchListItem : React.FC<RecentSearchListItemProps> = ({
    contentType,
    image,
    name,
    onPressDelete,
    onPress
}) => {

    const { theme } = useTheme()

    return (
        <HorizontalListItemContainer>
            <ListItemProfile
                contentType={contentType}
                image={image}
                onPress={onPress}
            />
            <TextContainer border='regular' onPress={onPress}>
                <Text marginBottom='xs' variant='p2-bold'>{name}</Text>
                <Text variant='p4-secondary'>{contentType}</Text>
            </TextContainer>
            <IconContainer onPress={onPressDelete}>
                <Icon
                    name='x'
                    color={theme.colors.t1}
                    size={18}
                />
            </IconContainer>
        </HorizontalListItemContainer>
    )
}

export default RecentSearchListItem