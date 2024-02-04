import React from 'react'
import EditableAssetImageDefault from './EditableAssetImageDefault'
import EditableAssetImageDisplay from './EditableAssetImageDisplay'


interface EditableAssetImageProps {
    id: number
    image?: string
    onChangeImage?: (id: number, url: string) => void
}

const EditableAssetImage : React.FC<EditableAssetImageProps> = ({
    id,
    image,
    onChangeImage
}) => {

    const imageDidSelect = (url: string) => {
        onChangeImage && onChangeImage(id, url)
    }

    if (image) return <EditableAssetImageDisplay image={image} imageDidSelect={imageDidSelect} />

    return <EditableAssetImageDefault imageDidSelect={imageDidSelect} />
}

export default EditableAssetImage