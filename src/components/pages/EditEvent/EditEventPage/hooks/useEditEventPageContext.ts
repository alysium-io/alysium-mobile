import { useContext } from 'react'
import { EditEventPageContext, EditEventPageContextType } from '../contexts'

const useEditEventPageContext = () : EditEventPageContextType => {

    const context = useContext(EditEventPageContext)

    if (!context) {
        throw new Error('useEditEventPage must be used within a EditEventPageProvider')
    }

    return context

}

export default useEditEventPageContext