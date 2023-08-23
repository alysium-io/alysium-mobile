const fs = require('fs')
const packageJson = require('../package.json')

// Increment the `build_number` field in the package.json by 1
packageJson.build_number = packageJson.build_number + 1

fs.writeFileSync('./package.json', JSON.stringify(packageJson, null, 2) + '\n')
