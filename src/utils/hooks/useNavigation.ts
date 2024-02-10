import { useNavigation as useRNNavigation } from '@react-navigation/native'
import { ApiIdentifier, CompositeScreenNavigationProp } from '@types'


interface IUseNavigation {

    /** Pages */
    hostPage: (hostId: ApiIdentifier) => void
    hostFollowersAndShowsPage: (hostId: number, defaultTabIndex: number) => void

    artistPage: (artistId: ApiIdentifier) => void
    artistFollowersAndShowsPage: (artistId: number, defaultTabIndex: number) => void

    tagPage: (tagId: ApiIdentifier) => void
    tagFollowersPage: (tagId: number) => void

    profilePage: () => void

    eventPage: (eventId: ApiIdentifier) => void
    
    editEventPage: (eventId: ApiIdentifier) => void

    eventCandidatesPage: (eventId: ApiIdentifier) => void

    editVenuePage: (venueId: ApiIdentifier) => void

    editContractPage: (contractId: ApiIdentifier) => void

    searchPage: () => void

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
    const hostPage = (hostId: ApiIdentifier) => navigation.navigate('HostPage', { hostId })
    const hostFollowersAndShowsPage = (hostId: ApiIdentifier, defaultTabIndex: number) => navigation.navigate('HostFollowersAndShowsPage', { hostId, defaultTabIndex })

    const artistPage = (artistId: ApiIdentifier) => navigation.navigate('ArtistPage', { artistId })
    const artistFollowersAndShowsPage = (artistId: ApiIdentifier, defaultTabIndex: number) => navigation.navigate('ArtistFollowersAndShowsPage', { artistId, defaultTabIndex })

    const tagPage = (tagId: ApiIdentifier) => navigation.navigate('TagPage', { tagId })
    const tagFollowersPage = (tagId: ApiIdentifier) => navigation.navigate('TagFollowersPage', { tagId })

    const profilePage = () => navigation.navigate('ProfilePage')

    const eventPage = (eventId: ApiIdentifier) => navigation.navigate('EventPage', { eventId })

    const eventCandidatesPage = (eventId: ApiIdentifier) => navigation.navigate('EventCandidatesPage', { eventId })
    
    const editEventPage = (eventId: ApiIdentifier) => navigation.navigate('EditEventPage', { eventId })

    const editVenuePage = (venueId: ApiIdentifier) => navigation.navigate('EditVenuePage', { venueId })

    const editContractPage = (contractId: ApiIdentifier) => navigation.navigate('EditContractPage', { contractId })

    const searchPage = () => navigation.navigate('SearchPage')

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

        eventCandidatesPage,
        
        editEventPage,

        editVenuePage,

        editContractPage,

        searchPage,

        eventManagerPage,

        contractManager,

        back,

        experimentPageTwo

    }
}

export default useNavigation