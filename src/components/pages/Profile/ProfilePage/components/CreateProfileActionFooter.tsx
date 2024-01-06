import React from 'react'
import { View } from '@atomic'
import { Button } from '@molecules'
import { useSheet } from '@hooks'
import { CreateHostBottomSheet, CreateArtistBottomSheet } from '@templates'


const CreateProfileActionFooter = () => {

    const createHostSheetApi = useSheet()
    const createArtistSheetApi = useSheet()

    return (
        <>
            <View flexDirection='row'>
                <View margin='m' flex={1} marginRight='s'>
                    <Button
                        text='Create Host'
                        onPress={() => createHostSheetApi.open()}
                    />
                </View>
                <View margin='m' flex={1} marginLeft='s'>
                    <Button
                        text='Create Artist'
                        onPress={() => createArtistSheetApi.open()}
                    />
                </View>
            </View>
            <CreateHostBottomSheet sheetApi={createHostSheetApi} />
            <CreateArtistBottomSheet sheetApi={createArtistSheetApi} />
        </>
    )
}

export default CreateProfileActionFooter