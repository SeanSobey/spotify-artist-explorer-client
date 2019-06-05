/**
 * Retry a promise with linear back-off up to a max number of times.
 * @param promiseFn Function to create the promise.
 * @param retryFn Function to check if we want to retry.
 * @param retries Max number of retries
 * @param retryInterval Max retry interval
 */
export async function retryAfter<T>(promiseFn: () => Promise<T>, retryFn: (error: any) => boolean, retries: number = 5, retryInterval: number = 2000): Promise<T> {
	try {
		return await promiseFn();
	} catch (error) {
		if (retries === 0) {
			throw error;
		}
		if (!retryFn(error)) {
			throw error;
		}
		const currentRetryInterval = retryInterval / retries; // <-- Linear backoff
		await asyncTimeout(currentRetryInterval);
		return retryAfter(promiseFn, retryFn, retries - 1, retryInterval);
	}
}

/**
 * Async version of setTimeout
 * @param timeout The timeout in ms.
 */
export async function asyncTimeout(timeout: number) {
	return new Promise((resolve) => setTimeout(() => resolve(), timeout));
}
