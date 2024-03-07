import React, { useState } from 'react'
import { View } from '@atomic'
import { LayoutChangeEvent, StyleSheet } from 'react-native'
import TabTogglerText from './TabTogglerText'
import TabTogglerAnimatedBackground from './TabTogglerAnimatedBackground'


type Dims = {
    height: number
    width: number
}

type TabTogglerItem = {
    id: number
    text: string
}

interface TabTogglerProps {
    data: TabTogglerItem[]
    defaultActiveTab: number
    onChange: (id: number) => void
}

const TabToggler : React.FC<TabTogglerProps> = ({
    data,
    defaultActiveTab,
    onChange
}) => {

    const [dims, setDims] = useState<Dims>({
        height: 0,
        width: 0
    })

    const [tabIndex, setTabIndex] = useState<number>(defaultActiveTab)

    const _onLayout = (e: LayoutChangeEvent) => {
        setDims({
            height: e.nativeEvent.layout.height,
            width: e.nativeEvent.layout.width
        })
    }

    const _onChange = (id: number) => {
        setTabIndex(id)
        onChange(id)
    }

    return (
        <View style={styles.container} backgroundColor='t2' onLayout={_onLayout}>
            <TabTogglerAnimatedBackground
                height={dims.height}
                width={dims.width / data.length}
                tabIndex={tabIndex}
            />
            {
                data.map(({ id, text }) => (
                    <TabTogglerText
                        key={id}
                        text={text}
                        isActive={id === tabIndex}
                        onPress={() => _onChange(id)}
                    />
                ))
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderRadius: 999
    }
})

export default TabToggler