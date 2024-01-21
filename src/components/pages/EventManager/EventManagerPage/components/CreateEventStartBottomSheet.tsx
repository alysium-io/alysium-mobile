import React, { useState } from 'react'
import { View } from '@atomic'
import { SheetApi, useHost, useNavigation } from '@hooks'
import { BottomSheet, BottomSheetHeader } from '@organisms'
import { Button, TextInput } from '@molecules'


interface CreateEventStartBottomSheetProps {
    sheetApi: SheetApi
}

const CreateEventStartBottomSheet : React.FC<CreateEventStartBottomSheetProps> = ({
    sheetApi
}) => {

    const { createEvent } = useHost()
    const { editEventPage } = useNavigation()

    const [eventName, setEventName] = useState<string>('')

    const _createEvent = async () => {
        const data = await createEvent({ name: eventName })
        if (data !== null) {
            sheetApi.close()
            editEventPage(data.id)
        }
    }

    return (
        <BottomSheet sheetRef={sheetApi.sheetRef}>
            <BottomSheetHeader text='Create Event' />
            <View margin='m' marginTop='l'>
                <TextInput
                    placeholder='Event Name'
                    onChangeText={(text) => setEventName(text)}
                />
            </View>
            <View margin='m'>
                <Button
                    text='Create'
                    onPress={_createEvent}
                    colorVariant='positive'
                />
            </View>
        </BottomSheet>
    )
}

export default CreateEventStartBottomSheet