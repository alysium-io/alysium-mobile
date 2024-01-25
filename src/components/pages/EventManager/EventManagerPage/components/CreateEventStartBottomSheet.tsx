import React, { useState } from 'react'
import { KeyboardViewFill, View } from '@atomic'
import { SheetApi, useButton, useHost, useNavigation, useTextInput } from '@hooks'
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
    const {
        buttonState: createEventButtonState,
        setButtonState
    } = useButton('disabled')

    const [eventName, setEventName] = useState<string>('')

    const _setEventName = (text: string) => {
        setEventName(text)
        if (text.length > 0) {
            setButtonState('default')
        } else {
            setButtonState('disabled')
        }
    }

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

    const onDismiss = () => {
        setButtonState('disabled')
        setEventName('')
    }

    return (
        <BottomSheet sheetRef={sheetApi.sheetRef} borderRadius={false} borderColor='ion_dark' onChange={onChange} onDismiss={onDismiss}>
            <BottomSheetHeader text='Create Event' />
            <View margin='m' marginTop='l'>
                <TextInput
                    textInputApi={textInputApi}
                    placeholder='Event Name'
                    onChangeText={_setEventName}
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
                        colorVariant='default'
                        buttonState={createEventButtonState}
                        disabled={eventName.length === 0}
                    />
                </View>
            </View>
            <KeyboardViewFill />
        </BottomSheet>
    )
}

export default CreateEventStartBottomSheet