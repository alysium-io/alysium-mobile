import { useNavigation as useRNNavigation } from '@react-navigation/native'
import { CompositeScreenNavigationProp } from '@types'


interface IUseNavigation {

    /** Pages */
    hostPage: (itemId: number) => void
    hostFollowersAndShowsPage: (itemId: number, defaultTabIndex: number) => void

    artistPage: (itemId: number) => void
    artistFollowersAndShowsPage: (itemId: number, defaultTabIndex: number) => void

    tagPage: (itemId: number) => void
    tagFollowersPage: (itemId: number) => void

    profilePage: () => void

    eventPage: (itemId: number) => void
    
    editEventPage: (itemId: number) => void

    editContractPage: (itemId: number) => void

    searchPage: () => void

    authPage: () => void

    eventManagerPage: () => void

    contractManager: () => void

    /** General */
    back: () => void

    /** Test */
    experimentPageTwo: () => void

}

const useNavigation = () : IUseNavigation => {

    const navigation = useRNNavigation<CompositeScreenNavigationProp>()

    /**
     * Pages
     */
    const hostPage = (itemId: number) => navigation.navigate('HostPage', { itemId })
    const hostFollowersAndShowsPage = (itemId: number, defaultTabIndex: number) => navigation.navigate('HostFollowersAndShowsPage', { itemId, defaultTabIndex })

    const artistPage = (itemId: number) => navigation.navigate('ArtistPage', { itemId })
    const artistFollowersAndShowsPage = (itemId: number, defaultTabIndex: number) => navigation.navigate('ArtistFollowersAndShowsPage', { itemId, defaultTabIndex })

    const tagPage = (itemId: number) => navigation.navigate('TagPage', { itemId })
    const tagFollowersPage = (itemId: number) => navigation.navigate('TagFollowersPage', { itemId })

    const profilePage = () => navigation.navigate('ProfilePage')

    const eventPage = (itemId: number) => navigation.navigate('EventPage', { itemId })
    
    const editEventPage = (itemId: number) => navigation.navigate('EditEventPage', { itemId })

    const editContractPage = (itemId: number) => navigation.navigate('EditContractPage', { itemId })

    const searchPage = () => navigation.navigate('SearchPage')

    const authPage = () => navigation.navigate('AuthPage')

    const eventManagerPage = () => navigation.navigate('EventManagerPage')

    const contractManager = () => navigation.navigate('ContractManagerPage')

    /**
     * General
     */
    const back = () => navigation.goBack()

    /**
     * Test
     */
    const experimentPageTwo = () => navigation.navigate('ExperimentPageTwo')

    return {

        hostPage,
        hostFollowersAndShowsPage,

        artistPage,
        artistFollowersAndShowsPage,

        tagPage,
        tagFollowersPage,
        
        profilePage,

        eventPage,
        
        editEventPage,

        editContractPage,

        searchPage,

        authPage,

        eventManagerPage,

        contractManager,

        back,

        experimentPageTwo

    }
}

export default useNavigation