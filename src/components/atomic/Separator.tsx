import React from 'react'
import { View } from '@atomic'


const sizeScheme = {
    medium: 1,
    large: 5
}

type SeparatorProps = React.ComponentProps<typeof View> & {
    size?: keyof typeof sizeScheme
}

const Separator : React.FC<SeparatorProps> = ({
    size = 'medium',
    ...props
}) => {

    return (
        <View
            marginVertical='m'
            style={{
                width: '100%',
                height: sizeScheme[size]
            }}
            backgroundColor='bg2'
            {...props}
        />
    )
}

export default Separator