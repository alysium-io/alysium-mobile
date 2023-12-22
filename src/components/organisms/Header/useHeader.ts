import { useSafeAreaInsets } from 'react-native-safe-area-context'


interface IUseHeader {
    headerHeight: number
    totalHeaderHeight: number
}

const useHeader = () : IUseHeader => {

    const insets = useSafeAreaInsets()
    const headerHeight = 65
    
    return {
        headerHeight,
        totalHeaderHeight: insets.top + headerHeight
    }
}

export default useHeader