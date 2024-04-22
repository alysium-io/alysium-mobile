import { useIsFocused } from '@react-navigation/native';
import { StackNavigationOptions } from '@react-navigation/stack';

interface IUseTabSettings {
	screenOptions: StackNavigationOptions;
}

const useTabSettings = (): IUseTabSettings => {
	return {
		screenOptions: {
			headerShown: useIsFocused(),
			headerBackTitleVisible: false,
			headerTransparent: true
		}
	};
};

export default useTabSettings;
