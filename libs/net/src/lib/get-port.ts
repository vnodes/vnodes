import { createServer, type Server } from 'node:net';

/**
 * Get an open port number between {@link start} and {@link end}F
 */
export async function getPort(start: number, end: number) {
    for (let i = start; i <= end; i++) {
        const result = await new Promise((resolve) => {
            const server: Server = createServer();
            server.once('error', () => {
                server.close();
                resolve(false);
            });

            server.once('listening', () => {
                server.close(() => resolve(true));
            });

            server.listen(i, '127.0.0.1');
        });

        if (result === true) {
            return i;
        }
    }

    throw new Error(`There is no available port between ${start} and ${end}`);
}
