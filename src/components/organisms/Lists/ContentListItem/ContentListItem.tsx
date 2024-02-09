import React from 'react'
import { ListItemImage, ListItemMarker, ListItemTitle, ListItemActionIcon, ListItemContainer, ListItemRank } from '../shared'


type ContentListItemProps =
    React.ComponentProps<typeof ListItemMarker> &
    React.ComponentProps<typeof ListItemTitle> &
    React.ComponentProps<typeof ListItemContainer> &
    React.ComponentProps<typeof ListItemActionIcon> &
    React.ComponentProps<typeof ListItemRank> &
    React.ComponentProps<typeof ListItemImage> &
{
    onPressMenu?: () => void
}

const ContentListItem : React.FC<ContentListItemProps> = ({
    title,
    subtitle,
    rnk,
    onPress,
    contentType,
    image,
    border,
    onPressMenu,
    markerIcon,
    size = 'medium',
    actionIcon = 'arrow',
    subtitleFirst = false,
    borderRadius = 'round'
}) => {

    return (
        <ListItemContainer border={border} onPress={onPress}>
            { rnk && <ListItemRank rnk={rnk} /> }
            <ListItemImage contentType={contentType} image={image} size={size} borderRadius={borderRadius} />
            <ListItemTitle title={title} subtitle={subtitle} subtitleFirst={subtitleFirst} />
            { markerIcon && <ListItemMarker markerIcon={markerIcon} /> }
            <ListItemActionIcon actionIcon={actionIcon} onPress={onPressMenu} />
        </ListItemContainer>
    )
}

export default ContentListItem