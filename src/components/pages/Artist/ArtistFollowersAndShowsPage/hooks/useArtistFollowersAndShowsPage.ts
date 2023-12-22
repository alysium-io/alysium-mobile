import { useContext } from 'react'
import { ArtistFollowersAndShowsPageContext, ArtistFollowersAndShowsPageContextType } from '../contexts'

const useArtistFollowersAndShowsPage = () : ArtistFollowersAndShowsPageContextType => {

    const context = useContext(ArtistFollowersAndShowsPageContext)

    if (!context) {
        throw new Error('useArtistFollowersAndShowsPage must be used within an ArtistFollowersAndShowsPageContext')
    }
    
    return context
}

export default useArtistFollowersAndShowsPage