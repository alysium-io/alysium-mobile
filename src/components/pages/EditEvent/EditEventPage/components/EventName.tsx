import React from 'react'
import { View } from '@atomic'
import { LargeTextInput } from '@molecules'
import { Controller } from 'react-hook-form'
import { useEditEventPageContext } from '../hooks'


const defaultEventName = 'Event name'

const EventName = () => {

    const { formMethods } = useEditEventPageContext()

    return (
        <View marginHorizontal='m' marginTop='l'>
            <Controller
                name='name'
                control={formMethods.control}
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <LargeTextInput
                        placeholder={defaultEventName}
                        onChangeText={onChange}
                        textAlign='center'
                        onBlur={onBlur}
                        value={value}
                    />
                )}
            />
        </View>
    )
}

export default EventName