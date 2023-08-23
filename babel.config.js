module.exports = {
	presets: ['module:metro-react-native-babel-preset'],
	plugins: [
		[
			'module-resolver', {
				root: ['.'],
				extensions: ['.ios.js', '.android.js', '.js', '.json', '.ts', '.tsx'],
				alias: {
					"@components":    "./src/components",
					"@screens":       "./src/components/screens",
					"@hooks":         "./src/utils/hooks",
					"@restyle":       "./src/restyle",
					"@redux":         "./src/redux",
					"@atomic":        "./src/components/atomic",
					"@subatomic":     "./src/components/subatomic",
					"@molecules":     "./src/components/molecules",
					"@svg":           "./src/svg",
					"@etc":           "./src/etc",
					"@types":         "./src/types",
				}
			}
		],
		'react-native-reanimated/plugin',
		'@babel/plugin-proposal-export-namespace-from'
	]
}
