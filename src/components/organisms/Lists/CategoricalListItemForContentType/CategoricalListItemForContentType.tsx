import React from 'react'
import { Icon } from '@atomic'
import { ContentType } from '@types'
import CategoricalListItemForContentTypeImage from './CategoricalListItemForContentTypeImage'
import { ListItemContainer, ListItemTitle } from '../shared'


type CategoricalListItemForContentTypeProps =
    React.ComponentProps<typeof ListItemTitle> &
    React.ComponentProps<typeof ListItemContainer> &
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