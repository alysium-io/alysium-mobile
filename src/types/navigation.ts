import { CompositeNavigationProp, ParamListBase, RouteProp } from '@react-navigation/native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'


/**
 * Stack Navigators
 * 
 * Stack navigators are used to navigate between screens.
 * 
 * @example
 * 
 * const navigation = useNavigation<SearchScreenNavigationProp>();
 * 
 * navigation.navigate('SearchPage')
 */
export type SearchStackNavigatorParamList = {
    SearchPage: undefined;
    ArtistPage: { item_id: number };
}

export type ProfileStackNavigatorParamList = {
    ProfilePage: undefined;
}

/**
 * Bottom Tab Navigators
 * 
 * Bottom tab props are used to build the navigation prop for the stack navigators.
 * These props are configured to give stack navigation & tab navigation props to the stack navigators.
 * We have to compose the bottom tab navigation prop with the stack navigation prop to get the correct type.
 * 
 * @example Stack Navigation
 * 
 *  const navigation = useNavigation<SearchScreenNavigationProp>();
 *  navigation.navigate('SearchPage')
 * 
 * @example Tab Navigation
 * 
 *  const navigation = useNavigation<SearchScreenNavigationProp>();
 *  navigation.jumpTo('Profile')
 */
export type BottomTabNavigatorParamList = {
    Search: SearchStackNavigatorParamList;
    Profile: undefined;
}

type ComposeTabNavigationProp<T extends ParamListBase> = CompositeNavigationProp<
    NativeStackNavigationProp<T>,
    BottomTabNavigationProp<BottomTabNavigatorParamList>
>

export type SearchScreenNavigationProp = ComposeTabNavigationProp<SearchStackNavigatorParamList>

/**
 * Specific Route Props
 */
export type ArtistPageRouteProp = RouteProp<SearchStackNavigatorParamList, 'ArtistPage'>