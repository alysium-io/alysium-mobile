import React from 'react'
import { View } from '@atomic'
import { Button } from '@molecules'
import { BottomSheetFooterProps } from '@gorhom/bottom-sheet'
import { CustomFooter } from '../base'


interface FooterWithDismissButtonProps extends BottomSheetFooterProps {
    dismiss: () => void
}

const FooterWithDismissButton : React.FC<FooterWithDismissButtonProps> = ({
    dismiss,
    ...props
}) => {

    return (
        <CustomFooter {...props}>
            <View marginHorizontal='m'>
                <Button
                    text='Dismiss'
                    onPress={dismiss}
                />
            </View>
        </CustomFooter>
    )
}

export default FooterWithDismissButton