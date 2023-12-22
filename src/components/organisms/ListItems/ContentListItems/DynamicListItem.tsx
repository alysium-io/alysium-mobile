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


interface DynamicListItemProps {
    title: string
    image?: string
    color?: string
    contentType: ContentType
    onPress: () => void
}

const DynamicListItem : React.FC<DynamicListItemProps> = ({
    title,
    image,
    color,
    contentType,
    onPress
}) => {

    const { theme } = useTheme()

    return (
        <HorizontalListItemContainer>
            <ListItemProfile
                contentType={contentType}
                image={image}
                color={color}
                onPress={onPress}
            />
            <TextContainer border='regular' onPress={onPress}>
                <Text marginBottom='xs' variant='p2-bold'>{title}</Text>
                <Text variant='p4-secondary'>{contentType}</Text>
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

export default DynamicListItem