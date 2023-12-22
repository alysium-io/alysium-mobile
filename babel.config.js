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
					"@subatomic":     "./src/components/subatomic",
					"@atomic":        "./src/components/atomic",
					"@molecules":     "./src/components/molecules",
					"@organisms":     "./src/components/organisms",
					"@templates":     "./src/components/templates",
					"@pages":     	  "./src/components/pages",
					"@navigation":    "./src/components/navigation",
					"@svg":           "./src/svg",
					"@etc":           "./src/etc",
					"@types":         "./src/types",
					"@images": 	  	  "./src/assets/images",
				}
			}
		],
		'react-native-reanimated/plugin',
		'@babel/plugin-proposal-export-namespace-from'
	]
}
