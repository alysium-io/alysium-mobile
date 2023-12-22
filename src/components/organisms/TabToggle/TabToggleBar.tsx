import React from 'react'
import { View } from '@atomic'
import TabToggleTitleItem from './TabToggleTitleItem'
import TabToggleIndicator from './TabToggleIndicator'
import { useTheme } from '@hooks'
import { StyleSheet, Dimensions } from 'react-native'

const { width: containerWidth } = Dimensions.get('window')


interface TabToggleBarProps {
    tabs: string[];
    animatedValue: any;
    onPressTab: (index: number) => void;
}

const TabToggleBar : React.FC<TabToggleBarProps> = ({
    tabs,
    animatedValue,
    onPressTab
}) => {

    const { theme } = useTheme()

    return (
        <>
            <View
                style={[
                    styles.tabsContainer,
                    theme.borders.regular.bottom
                ]}
            >
                {tabs.map((tab, index) => (
                    <TabToggleTitleItem
                        key={tab}
                        title={tab}
                        onPress={() => onPressTab(index)}
                        animatedValue={animatedValue}
                        index={index}
                    />
                ))}
            </View>
            <TabToggleIndicator
                containerWidth={containerWidth}
                animatedValue={animatedValue}
                totalTabs={tabs.length}
            />
        </>
    )
}

const styles = StyleSheet.create({
    tabsContainer: {
        flexDirection: 'row'
    }
})

export default TabToggleBar