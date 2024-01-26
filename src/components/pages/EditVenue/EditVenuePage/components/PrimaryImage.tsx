import React from 'react'
import { View } from '@atomic'
import { EditableProfileImage } from '@molecules'
import { global } from '@etc'


const PrimaryImage = () => {

    return (
        <View marginTop='l' flexDirection='row' justifyContent='center'>
            <EditableProfileImage
                image={global.sampleData.images.event}
            />
        </View>
    )
}

export default PrimaryImage