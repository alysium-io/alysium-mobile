import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

const useBottomTabHeight = () => {
	/**
	 * The point of this is that sometimes we aren't within the bottom tab navigator context.
	 * So when we're not, just default to 0.
	 */
	try {
		return useBottomTabBarHeight();
	} catch (error) {
		return 0;
	}
};

export default useBottomTabHeight;
