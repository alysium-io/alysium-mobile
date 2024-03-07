import React from 'react'
import { Section } from '@atomic'
import { Button } from '@molecules'
import { useEditVenuePageContext } from '../hooks'


const ButtonsSection = () => {

    const { confirmDelete } = useEditVenuePageContext()

    return (
        <Section margin='m'>
            <Button
                text='Delete'
                onPress={confirmDelete}
                colorVariant='negative'
                variant='outlined'
            />
        </Section>
    )
}

export default ButtonsSection