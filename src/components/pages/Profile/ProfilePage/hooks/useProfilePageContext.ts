import { useContext } from 'react'
import { ProfilePageContext, ProfilePageContextType } from '../contexts'

const useProfilePageContext = () : ProfilePageContextType => {

    const context = useContext(ProfilePageContext)

    if (!context) {
        throw new Error('useProfilePage must be used within a ProfilePageProvider')
    }

    return context

}

export default useProfilePageContext