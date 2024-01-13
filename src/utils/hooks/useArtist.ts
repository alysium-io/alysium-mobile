import { artistActions } from 'src/redux/artist'
import artistApiSlice from 'src/redux/api/artistApiSlice'
import { ArtistState } from '@types'
import { useDispatch, useSelector } from '@redux'


const {
    useLazyGetArtistDetailsQuery
} = artistApiSlice

interface IUseArtist {
    artist: ArtistState
    resetArtist: () => void
    getArtistDetails: (artistId: number) => Promise<void>
}

const useArtist = () : IUseArtist => {

    const artist : ArtistState = useSelector(state => state.artist)
    const dispatch = useDispatch()

    const [ flux_getArtistDetails ] = useLazyGetArtistDetailsQuery()

    const getArtistDetails = async (artistId: number) => {
        try {
            const { data, error } = await flux_getArtistDetails({ artistId })

            if (error) {
                console.log(error)
            }
            if (data) {
                dispatch(artistActions.setArtist(data.data))
            }
        } catch (err) {
            throw err
        }
    }
    
    const resetArtist = () => {
        dispatch(artistActions.resetArtist())
    }
    
    return {
        artist,
        resetArtist,
        getArtistDetails
    }
}

export default useArtist