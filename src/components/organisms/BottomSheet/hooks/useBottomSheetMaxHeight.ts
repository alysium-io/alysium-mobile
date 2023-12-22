import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useWindowDimensions } from 'react-native'

const useBottomSheetMaxHeight = (maxHeight = '85%') : number => {

    const { height: deviceHeight } = useWindowDimensions()
    const maxHeightDecimal = parseFloat(`${maxHeight}`) / 100.0
    const { top: topSafeAreaInset } = useSafeAreaInsets()

    return (deviceHeight - topSafeAreaInset) * maxHeightDecimal

}

export default useBottomSheetMaxHeight