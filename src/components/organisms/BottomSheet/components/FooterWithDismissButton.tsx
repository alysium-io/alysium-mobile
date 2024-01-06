import React from 'react'
import { View } from '@atomic'
import { Button } from '@molecules'
import { BottomSheetFooterProps } from '@gorhom/bottom-sheet'
import { BottomSheetFooter } from '../base'


interface FooterWithDismissButtonProps extends BottomSheetFooterProps {
    dismiss: () => void
}

const FooterWithDismissButton : React.FC<FooterWithDismissButtonProps> = ({
    dismiss,
    ...props
}) => {

    return (
        <BottomSheetFooter {...props}>
            <View marginHorizontal='l'>
                <Button
                    text='Dismiss'
                    onPress={dismiss}
                />
            </View>
        </BottomSheetFooter>
    )
}

export default FooterWithDismissButton