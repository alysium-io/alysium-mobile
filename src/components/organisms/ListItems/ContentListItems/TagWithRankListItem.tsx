import React from 'react'
import { Icon, Text } from '@atomic'
import { useTheme } from '@hooks'
import {
    HorizontalListItemContainer,
    TextContainer,
    IconContainer,
    ListItemProfile
} from '@molecules'


interface TagWithRankListItemProps {
    rank: number
    name: string
    color: string
    onPress: () => void
}

const TagWithRankListItem : React.FC<TagWithRankListItemProps> = ({
    rank,
    name,
    color,
    onPress
}) => {

    const { theme } = useTheme()

    return (
        <HorizontalListItemContainer>
            <ListItemProfile
                contentType='tag'
                color={color}
                onPress={onPress}
            />
            <TextContainer border='regular' onPress={onPress}>
                <Text marginBottom='xs' variant='p2'>{name}</Text>
                <Text variant='p4-secondary'>#{rank}</Text>
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

export default TagWithRankListItem