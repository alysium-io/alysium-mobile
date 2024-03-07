import React from 'react'
import { MenuListItem } from '@organisms'
import { useEditEventPageContext } from '../hooks'


const CandidatesItem = () => {

    const { goToEventCandidatesPage } = useEditEventPageContext()

    return (
        <MenuListItem
            title='Candidates'
            subtitle='14 artists'
            onPress={goToEventCandidatesPage}
            color='ion'
            border={false}
        />
    )
}

export default CandidatesItem