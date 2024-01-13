import React from 'react'
import { View } from '@atomic'
import { Button } from '@molecules'
import { useNavigation } from '@hooks'


const CreateEventFooter = () => {

    const { editEventPage } = useNavigation()

    return (
        <View margin='m' flex={1}>
            <Button
                text='Create Event'
                onPress={() => editEventPage(null)}
            />
        </View>
    )
}

export default CreateEventFooter