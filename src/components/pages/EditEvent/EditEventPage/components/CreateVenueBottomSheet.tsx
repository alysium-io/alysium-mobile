import React, { useState } from 'react'
import { KeyboardViewFill, View } from '@atomic'
import { SheetApi, useButton, useTextInput } from '@hooks'
import { BottomSheet, BottomSheetHeader } from '@organisms'
import { Button, TextInput } from '@molecules'
import { useEditEventPageContext } from '../hooks'
import { useVenues } from '@hooks'


interface CreateVenueStartBottomSheetProps {
    sheetApi: SheetApi
}

const CreateVenueStartBottomSheet : React.FC<CreateVenueStartBottomSheetProps> = ({
    sheetApi
}) => {

    const { createVenueSheetApi } = useEditEventPageContext()
    const { createVenue } = useVenues()

    const textInputApi = useTextInput()
    const {
        buttonState: createVenueButtonState,
        setButtonState
    } = useButton('disabled')

    const [venueName, setVenueName] = useState<string>('')

    const _setVenueName = (text: string) => {
        setVenueName(text)
        if (text.length > 0) {
            setButtonState('default')
        } else {
            setButtonState('disabled')
        }
    }

    const _createVenue = async () => {
        createVenue(venueName)
        createVenueSheetApi.close()
    }

    const onChange = (index: number) => {
        if (index === 0) {
            textInputApi.focus()
        }
    }

    const onDismiss = () => {
        setButtonState('disabled')
        setVenueName('')
    }

    return (
        <BottomSheet sheetRef={sheetApi.sheetRef} borderRadius={false} borderColor='ion_dark' onChange={onChange} onDismiss={onDismiss}>
            <BottomSheetHeader text='Create Venue' />
            <View margin='m' marginTop='l'>
                <TextInput
                    textInputApi={textInputApi}
                    placeholder='Venue Name'
                    onChangeText={_setVenueName}
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
                        onPress={_createVenue}
                        colorVariant='default'
                        buttonState={createVenueButtonState}
                        disabled={venueName.length === 0}
                    />
                </View>
            </View>
            <KeyboardViewFill />
        </BottomSheet>
    )
}

export default CreateVenueStartBottomSheet