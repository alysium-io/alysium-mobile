import React from 'react'
import { View } from '@atomic'
import { EditableProfileImage } from '@molecules'
import { useEditEventPageContext } from '../hooks'


const PrimaryImage = () => {

    const { eventData, changeEventImage } = useEditEventPageContext()

    return (
        <View marginTop='l' flexDirection='row' justifyContent='center'>
            <EditableProfileImage
                image={eventData?.data.attributes.image?.data?.attributes.url || ''}
                onChooseImage={changeEventImage}
            />
        </View>
    )
}

export default PrimaryImage