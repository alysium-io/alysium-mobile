import { useContext } from 'react'
import { EventPageContext, EventPageContextType } from '../contexts'

const useEventPageContext = () : EventPageContextType => {

    const context = useContext(EventPageContext)

    if (!context) {
        throw new Error('useEventPage must be used within a EventPageProvider')
    }

    return context

}

export default useEventPageContext