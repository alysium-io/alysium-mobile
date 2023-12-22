import { useContext } from 'react'
import { TagFollowersPageContext, TagFollowersPageContextType } from '../contexts/TagFollowersPageContext'

const useTagFollowersPageContext = () : TagFollowersPageContextType => {

    const context = useContext(TagFollowersPageContext)

    if (!context) {
        throw new Error('useTagFollowersPageContext must be used within a TagFollowersPageContextProvider')
    }
    
    return context
}

export default useTagFollowersPageContext