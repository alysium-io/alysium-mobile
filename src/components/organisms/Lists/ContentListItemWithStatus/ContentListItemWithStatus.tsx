import React from 'react'
import StatusBar from './StatusBar'
import { ListItemImage, ListItemTitle, ListItemContainer } from '../shared'


type ContentListItemWithStatusProps =
    Omit<React.ComponentProps<typeof ListItemContainer>, 'children'> &
    React.ComponentProps<typeof ListItemTitle> &
    React.ComponentProps<typeof ListItemImage> &
    React.ComponentProps<typeof StatusBar> &
{
    onPressStatus?: () => void
}

const ContentListItemWithStatus : React.FC<ContentListItemWithStatusProps> = ({
    title,
    subtitle,
    onPress,
    contentType,
    image,
    border,
    onPressStatus,
    statusText,
    statusColor,
    statusBarVariant,
    size = 'medium',
    subtitleFirst = false,
    borderRadius = 'round'
}) => {

    return (
        <ListItemContainer border={border} onPress={onPress}>
            <ListItemImage contentType={contentType} image={image} size={size} borderRadius={borderRadius} />
            <ListItemTitle title={title} subtitle={subtitle} subtitleFirst={subtitleFirst} />
            <StatusBar statusText={statusText} statusColor={statusColor} statusBarVariant={statusBarVariant} />
        </ListItemContainer>
    )
}

export default ContentListItemWithStatus