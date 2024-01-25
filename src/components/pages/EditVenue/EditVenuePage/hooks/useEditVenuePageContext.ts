import { useContext } from 'react'
import { EditVenuePageContext, EditVenuePageContextType } from '../contexts'

const useEditVenuePageContext = () : EditVenuePageContextType => {

    const context = useContext(EditVenuePageContext)

    if (!context) {
        throw new Error('useEditVenuePage must be used within a EditVenuePageProvider')
    }

    return context

}

export default useEditVenuePageContext