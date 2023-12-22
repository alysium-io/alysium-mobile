import { useContext } from 'react'
import { HostFollowersAndShowsPageContext, HostFollowersAndShowsPageContextType } from '../contexts'

const useHostFollowersAndShowsPage = () : HostFollowersAndShowsPageContextType => {

    const context = useContext(HostFollowersAndShowsPageContext)

    if (!context) {
        throw new Error('useHostFollowersAndShowsPage must be used within an HostFollowersAndShowsPageContext')
    }
    
    return context
}

export default useHostFollowersAndShowsPage