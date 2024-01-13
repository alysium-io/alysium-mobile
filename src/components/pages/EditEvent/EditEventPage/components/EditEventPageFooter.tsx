import React from 'react'
import { View } from '@atomic'
import { Button } from '@molecules'


const EditEventPageFooter = () => {

    return (
        <View margin='m' flex={1}>
            <Button
                text='Save Draft'
                onPress={() => console.log('saved')}
                color_variant='meteor'
                variant='outlined'
            />
        </View>
    )
}

export default EditEventPageFooter