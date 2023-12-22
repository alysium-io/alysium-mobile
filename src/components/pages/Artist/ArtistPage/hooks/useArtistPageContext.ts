import { useContext } from 'react'
import { ArtistPageContext, ArtistPageContextType } from '../contexts'

const useArtistPageContext = () : ArtistPageContextType => {

    const context = useContext(ArtistPageContext)

    if (!context) {
        throw new Error('useArtistPage must be used within a ArtistPageProvider')
    }

    return context

}

export default useArtistPageContext