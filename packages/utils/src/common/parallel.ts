type Task<T> = () => Promise<T>;

/**
 * Executes an array of asynchronous tasks with a limited concurrency.
 * * @param tasks An array of functions that return promises (thunks).
 * @param limit The maximum number of tasks to run concurrently.
 * @returns A promise that resolves to an array of results in the original order.
 */
export async function parallel<T>(tasks: Task<T>[], limit: number): Promise<T[]> {
  if (limit <= 0) {
    throw new Error('Concurrency limit must be greater than 0');
  }

  const results: T[] = new Array(tasks.length);
  let nextIndex = 0;

  // Worker pool execution loop
  const runWorker = async (): Promise<void> => {
    while (nextIndex < tasks.length) {
      // Capture current index and immediately increment for the next worker
      const currentIndex = nextIndex++;

      try {
        results[currentIndex] = await tasks[currentIndex]();
      } catch (error) {
        // Reject the entire batch if a single task fails (matches Promise.all behavior)
        return Promise.reject(error);
      }
    }
  };

  // Create an array of active worker promises up to the maximum limit
  const workerPool = Array.from({ length: Math.min(limit, tasks.length) }, () => runWorker());

  // Wait for all workers to finish exhausting the queue
  await Promise.all(workerPool);

  return results;
}
