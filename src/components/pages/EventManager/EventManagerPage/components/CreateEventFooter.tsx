import React from 'react'
import { View } from '@atomic'
import { Button } from '@molecules'
import CreateEventStartBottomSheet from './CreateEventStartBottomSheet'
import { useEventManagerPageContext } from '../hooks'


const CreateEventFooter = () => {

    const { createEventStartSheetApi } = useEventManagerPageContext()

    return (
        <View margin='m' flex={1}>
            <Button
                text='Create Event'
                onPress={() => createEventStartSheetApi.open()}
            />
            <CreateEventStartBottomSheet sheetApi={createEventStartSheetApi} />
        </View>
    )
}

export default CreateEventFooter