import React from 'react'
import { Icon } from '@atomic'
import { ContentType } from '@types'
import CategoricalListItemForContentTypeImage from './CategoricalListItemForContentTypeImage'
import { ListItemContainer, ListItemTitle } from '../shared'


type CategoricalListItemForContentTypeProps =
    Omit<React.ComponentProps<typeof ListItemContainer>, 'children'> &
    React.ComponentProps<typeof ListItemTitle> &
{
    contentType: ContentType.artist | ContentType.host | ContentType.tag | ContentType.location
}

const CategoricalListItemForContentType : React.FC<CategoricalListItemForContentTypeProps> = ({
    contentType,
    title,
    subtitle,
    onPress
}) => {

    return (
        <ListItemContainer border onPress={onPress}>
            <CategoricalListItemForContentTypeImage contentType={contentType} />
            <ListItemTitle title={title} subtitle={subtitle} />
            <Icon name='arrow-right' color='ion' size='small' />
        </ListItemContainer>
    )
}

export default CategoricalListItemForContentType