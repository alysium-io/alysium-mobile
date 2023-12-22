import React from 'react'
import TagFollowersPage from './TagFollowersPage'
import { TagFollowersPageProvider } from './contexts'


const TagPageWrapper = () => {

    return (
        <TagFollowersPageProvider>
            <TagFollowersPage />
        </TagFollowersPageProvider>
    )
}

export default TagPageWrapper