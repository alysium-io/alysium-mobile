import React from 'react'
import { View } from '@atomic'
import { Button } from '@molecules'
import { useEditVenuePageContext } from '../hooks'


const EditVenuePageFooter = () => {

    const { onSubmit } = useEditVenuePageContext()

    return (
        <View margin='m' flex={1}>
            <Button
                text='Save'
                onPress={onSubmit}
                colorVariant='positive'
                variant='filled'
            />
        </View>
    )
}

export default EditVenuePageFooter