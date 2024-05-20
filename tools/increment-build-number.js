const fs = require('fs');
const prettier = require('prettier');
const packageJson = require('../package.json');

(async () => {
	// Increment the `build_number` field in the package.json by 1
	packageJson.build_number = packageJson.build_number + 1;

	// Get Prettier configuration
	const prettierConfig = await prettier.resolveConfig('./.prettierrc');

	// Format the JSON string using Prettier
	const formattedJson = await prettier.format(JSON.stringify(packageJson), {
		...prettierConfig,
		parser: 'json'
	});

	// Write the formatted JSON string to the package.json file
	fs.writeFileSync('./package.json', formattedJson + '\n');
})();
