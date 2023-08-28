import { SearchScreenNavigationProp } from 'src/types'
import { useNavigation as useRNNavigation } from '@react-navigation/native'


interface IUseNavigation {
    back: () => void;
    artistPage: (item_id: number) => void;
}

const useNavigation = () : IUseNavigation => {

    const navigation = useRNNavigation<SearchScreenNavigationProp>()

    const back = () => navigation.goBack()
    const artistPage = (item_id: number) => navigation.navigate('ArtistPage', { item_id })

    return {
        back,
        artistPage
    }
}

export default useNavigation