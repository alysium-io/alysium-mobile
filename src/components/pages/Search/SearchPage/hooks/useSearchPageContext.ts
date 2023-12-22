import { useContext } from 'react'
import { SearchPageContext, SearchPageContextType } from '../contexts'

const useSearchPageContext = () : SearchPageContextType => {

    const context = useContext(SearchPageContext)

    if (!context) {
        throw new Error('useSearchPage must be used within a SearchPageProvider')
    }

    return context

}

export default useSearchPageContext