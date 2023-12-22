import React from 'react'
import { View } from '@atomic'
import { Button } from '@molecules'


const CreateEventFooter = () => {

    return (
        <View margin='m' flex={1}>
            <Button
                text='Create Event'
                onPress={() => console.log('pressed')}
            />
        </View>
    )
}

export default CreateEventFooter