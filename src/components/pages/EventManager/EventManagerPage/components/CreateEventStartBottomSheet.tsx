import React, { useState } from 'react'
import { KeyboardViewFill, View } from '@atomic'
import { SheetApi, useHost, useNavigation, useTextInput } from '@hooks'
import { BottomSheet, BottomSheetHeader } from '@organisms'
import { Button, TextInput } from '@molecules'


interface CreateEventStartBottomSheetProps {
    sheetApi: SheetApi
}

const CreateEventStartBottomSheet : React.FC<CreateEventStartBottomSheetProps> = ({
    sheetApi
}) => {

    const textInputApi = useTextInput()
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

    const onChange = (index: number) => {
        if (index === 0) {
            textInputApi.focus()
        }
    }

    return (
        <BottomSheet sheetRef={sheetApi.sheetRef} borderRadius={false} borderColor='ion_dark' onChange={onChange}>
            <BottomSheetHeader text='Create Event' />
            <View margin='m' marginTop='l'>
                <TextInput
                    textInputApi={textInputApi}
                    placeholder='Event Name'
                    onChangeText={(text) => setEventName(text)}
                />
            </View>
            <View margin='m' flexDirection='row'>
                <View flex={1} marginRight='s'>
                    <Button
                        text='Cancel'
                        colorVariant='default'
                        variant='outlined'
                        onPress={() => sheetApi.close()}
                    />
                </View>
                <View flex={1} marginLeft='s'>
                    <Button
                        text='Create'
                        onPress={_createEvent}
                        colorVariant='positive'
                    />
                </View>
            </View>
            <KeyboardViewFill />
        </BottomSheet>
    )
}

export default CreateEventStartBottomSheet