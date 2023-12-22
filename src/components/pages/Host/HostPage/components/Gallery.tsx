import React from 'react'
import { useHostPageContext } from '../hooks'
import { ImageGallery } from '@organisms'


const Gallery = () => {

    const { images } = useHostPageContext()

    return (
        <ImageGallery images={images} />
    )
}

export default Gallery