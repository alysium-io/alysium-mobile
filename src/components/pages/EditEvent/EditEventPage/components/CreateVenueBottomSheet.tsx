import React, { useState } from 'react'
import { KeyboardViewFill, View } from '@atomic'
import { SheetApi, useHost, useNavigation, useTextInput } from '@hooks'
import { BottomSheet, BottomSheetHeader } from '@organisms'
import { Button, TextInput } from '@molecules'


interface CreateVenueBottomSheetProps {
    sheetApi: SheetApi
}

const CreateVenueBottomSheet : React.FC<CreateVenueBottomSheetProps> = ({
    sheetApi
}) => {

    const textInputApi = useTextInput()

    const [venueName, setVenueName] = useState<string>('')

    const onChange = (index: number) => {
        if (index === 0) {
            textInputApi.focus()
        }
    }

    return (
        <BottomSheet sheetRef={sheetApi.sheetRef} borderRadius={false} borderColor='ion_dark' onChange={onChange}>
            <BottomSheetHeader text='Create Venue' />
            <View margin='m' marginTop='l'>
                <TextInput
                    textInputApi={textInputApi}
                    placeholder='Venue Name'
                    onChangeText={(text) => setVenueName(text)}
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
                        onPress={() => console.log('created venue')}
                        colorVariant='positive'
                    />
                </View>
            </View>
            <KeyboardViewFill />
        </BottomSheet>
    )
}

export default CreateVenueBottomSheet