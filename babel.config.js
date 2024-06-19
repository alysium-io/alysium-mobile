module.exports = {
	presets: ['module:@react-native/babel-preset'],
	plugins: [
		[
			'module-resolver',
			{
				root: ['./'],
				extensions: ['.ios.js', '.android.js', '.js', '.json', '.ts', '.tsx'],
				alias: {
					'@subatomic': './src/components/subatomic',
					'@atomic': './src/components/atomic',
					'@molecules': './src/components/molecules',
					'@organisms': './src/components/organisms',
					'@templates': './src/components/templates',
					'@popups': './src/components/popups',
					'@pages': './src/components/pages',
					'@flux': './src/redux',
					'@flux/*': './src/redux/*',
					'@arch': './src/components/arch',
					'@arch/*': './src/components/arch/*',
					'@hooks': './src/utils/hooks',
					'@restyle': './src/restyle',
					'@svg': './src/svg',
					'@etc': './src/etc',
					'@types': './src/types',
					'@images': './src/assets/images',
					'@src/*': './src/*'
				}
			}
		],
		'react-native-reanimated/plugin',
		'@babel/plugin-proposal-export-namespace-from'
	]
};
