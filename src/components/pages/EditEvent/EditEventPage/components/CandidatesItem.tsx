import React from 'react'
import { MenuListItem } from '@organisms'


const CandidatesItem = () => {

    return (
        <MenuListItem
            title='Candidates'
            subtitle='14 artists'
            onPress={() => console.log('pressed')}
            color='ion'
            border={false}
        />
    )
}

export default CandidatesItem