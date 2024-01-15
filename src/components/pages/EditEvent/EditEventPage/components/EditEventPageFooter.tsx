import React from 'react'
import { View } from '@atomic'
import { Button } from '@molecules'
import { useEditEventPageContext } from '../hooks'


const EditEventPageFooter = () => {

    const { onSubmit } = useEditEventPageContext()

    return (
        <View margin='m' flex={1}>
            <Button
                text='Save Draft'
                onPress={onSubmit}
                color_variant='meteor'
                variant='outlined'
            />
        </View>
    )
}

export default EditEventPageFooter