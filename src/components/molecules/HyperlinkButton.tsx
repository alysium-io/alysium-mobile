import React from 'react'
import { View, Text } from '@atomic'
import { useTheme } from '@hooks'


interface HyperlinkButtonProps {
    children?: string;

}

const HyperlinkButton : React.FC<HyperlinkButtonProps> = ({
    children
}) => {

    const { theme } = useTheme()

    return (
        <View
            style={[
                {
                    ...theme.borders.thick.bottom,
                    borderBottomColor: theme.colors.brand1
                }
            ]}
        >
            <Text variant='p3-light' color='brand1'>{children}</Text>
        </View>
    )
}

export default HyperlinkButton