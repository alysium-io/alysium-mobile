import { useContext } from 'react'
import { EventCandidatesPageContext, EventCandidatesPageContextType } from '../contexts'

const useEventCandidatesPageContext = () : EventCandidatesPageContextType => {

    const context = useContext(EventCandidatesPageContext)

    if (!context) {
        throw new Error('useEventCandidatesPage must be used within a EventCandidatesPageProvider')
    }

    return context

}

export default useEventCandidatesPageContext