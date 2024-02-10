import React from 'react'
import { ListItemContainer, ListItemImage, ListItemTitle } from '../shared'
import ContentListItemToggleIcon from './ContentListItemToggleIcon'


type ContentListItemToggleProps =
    Omit<React.ComponentProps<typeof ListItemContainer>, 'children'> &
    React.ComponentProps<typeof ListItemTitle> &
    React.ComponentProps<typeof ListItemImage> &
{
    onPressToggle: () => void
    checked: boolean
}

const ContentListItemToggle : React.FC<ContentListItemToggleProps> = ({
    title,
    subtitle,
    onPress,
    onPressToggle,
    contentType,
    image,
    size = 'medium',
    border,
    subtitleFirst = false,
    borderRadius = 'round',
    checked
}) => {

    return (
        <ListItemContainer border={border} onPress={onPress}>
            <ListItemImage contentType={contentType} image={image} size={size} borderRadius={borderRadius} />
            <ListItemTitle title={title} subtitle={subtitle} subtitleFirst={subtitleFirst} />
            <ContentListItemToggleIcon checked={checked} onPress={onPressToggle} />
        </ListItemContainer>
    )
}

export default ContentListItemToggle