import { parallel } from './parallel.js'; // Adjust path as needed

describe('parallel utility', () => {
  it('should resolve all tasks and maintain original array order', async () => {
    // Tasks resolve out of chronological order due to varied delays
    const tasks = [
      async () => {
        await delay(30);
        return 'A';
      },
      async () => {
        await delay(10);
        return 'B';
      },
      async () => {
        await delay(20);
        return 'C';
      },
    ];

    const results = await parallel(tasks, 2);

    // Results must map perfectly to the input array index order
    expect(results).toEqual(['A', 'B', 'C']);
  });

  it('should strictly limit concurrent executions', async () => {
    let activeInstances = 0;
    let maxConcurrentObserved = 0;

    // Track the peak concurrency during execution
    const trackConcurrency = async () => {
      activeInstances++;
      maxConcurrentObserved = Math.max(maxConcurrentObserved, activeInstances);
      await delay(10);
      activeInstances--;
    };

    const tasks = Array.from({ length: 10 }, () => trackConcurrency);
    const limit = 3;

    await parallel(tasks, limit);

    expect(maxConcurrentObserved).toBe(limit);
  });

  it('should reject immediately if a single task fails', async () => {
    const tasks = [
      async () => 'Success 1',
      async () => {
        throw new Error('Task Failed!');
      },
      async () => 'Success 2',
    ];

    await expect(parallel(tasks, 2)).rejects.toThrow('Task Failed!');
  });

  it('should handle an empty array of tasks gracefully', async () => {
    const results = await parallel([], 5);
    expect(results).toEqual([]);
  });

  it('should throw an error if concurrency limit is less than or equal to 0', async () => {
    const tasks = [async () => 'test'];

    await expect(parallel(tasks, 0)).rejects.toThrow('Concurrency limit must be greater than 0');
    await expect(parallel(tasks, -1)).rejects.toThrow('Concurrency limit must be greater than 0');
  });

  it('should process everything sequentially if limit is 1', async () => {
    const executionOrder: number[] = [];

    const tasks = [
      async () => {
        executionOrder.push(1);
      },
      async () => {
        executionOrder.push(2);
      },
      async () => {
        executionOrder.push(3);
      },
    ];

    await parallel(tasks, 1);
    expect(executionOrder).toEqual([1, 2, 3]);
  });
});

// Helper utility for mocking asynchronous IO delays
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
