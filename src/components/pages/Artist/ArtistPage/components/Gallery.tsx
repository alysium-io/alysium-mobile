import React from 'react'
import { useArtistPageContext } from '../hooks'
import { ImageGallery } from '@organisms'


const Gallery = () => {

    const { images } = useArtistPageContext()

    return (
        <ImageGallery images={images} />
    )
}

export default Gallery