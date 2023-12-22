import React, { useState } from 'react'
import { View } from '@atomic'
import { LargeTextInput } from '@molecules'


const defaultEventName = 'Event name'

const EventName = () => {

    const [eventName, setEventName] = useState<string>(defaultEventName)

    return (
        <View marginHorizontal='m' marginTop='l'>
            <LargeTextInput
                placeholder={defaultEventName}
                onChangeText={text => setEventName(text)}
                textAlign='center'
            />
        </View>
    )
}

export default EventName