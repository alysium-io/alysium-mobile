export function pathJoin(...paths: string[]): string {
	return paths
		.map((path) => path.replace(/^\/+|\/+$/g, '')) // Remove leading and trailing slashes
		.filter((path) => path.length > 0) // Filter out empty strings
		.join('/'); // Join with a single slash
}
