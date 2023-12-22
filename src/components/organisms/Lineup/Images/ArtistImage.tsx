import React from 'react'
import { Avatar } from '@atomic'
import ImageContainer from './ImageContainer'
import { ContentType } from '@types'


interface ArtistImageProps {
    image: string
}

const ArtistImage : React.FC<ArtistImageProps> = ({
    image
}) => {

    return (
        <ImageContainer>
            <Avatar
                contentType={ContentType.artist}
                image={image}
                size='90%'
            />
        </ImageContainer>
    )
}

export default ArtistImage