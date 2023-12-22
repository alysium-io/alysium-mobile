import React from 'react'
import { View } from '@atomic'


type SectionProps = React.ComponentProps<typeof View> & {
    children?: React.ReactNode
}

const Section : React.FC<SectionProps> = ({
    children,
    ...props
}) => {

    return (
        <View {...props}>
            {children}
        </View>
    )
}

export default Section