const fs = require('fs');

function getCurrentVersionFromPackageJSON() {
	const packageJSON = fs.readFileSync('package.json', 'utf8');
	const packageObj = JSON.parse(packageJSON);
	return packageObj.version;
}

function readChangelog() {
	return fs.readFileSync('CHANGELOG.md', 'utf8');
}

function getChangelogForVersion(changelog, version) {
	var logs = [];

	const versionHeaderStart = `## [${version}]`;
	const sections = changelog
		.split('\n\n')
		.filter((section) => section.includes('## ['));

	for (const section of sections) {
		if (section.startsWith(versionHeaderStart)) {
			const lines = section.split('\n');
			const fullVersionHeader = lines[0]; // Get the full header line with the date

			logs.push(fullVersionHeader); // Add the full header to logs
			logs.push(...lines.slice(1).filter((line) => line.trim().length > 0)); // Add the log entries
			logs.push(''); // Add a blank line to separate the sections
		}
	}

	return logs.length > 0 ? logs.join('\n') : null;
}

function getLatestChangelog() {
	const currentVersion = getCurrentVersionFromPackageJSON();
	const changelog = readChangelog();

	const changelogSection = getChangelogForVersion(changelog, currentVersion);

	if (changelogSection !== null) {
		return changelogSection;
	} else {
		return 'No changelog found for version: ' + currentVersion;
	}
}
