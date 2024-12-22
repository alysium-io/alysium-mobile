// Function to wait for a specified amount of time, in seconds, before resolving.

/**
 * @param {number} seconds
 * @returns {Promise<void>}
 */
export const wait = (seconds: number) =>
	new Promise((resolve) => setTimeout(resolve, seconds * 1000));
