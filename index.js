// Modified from: https://github.com/node-fetch/node-fetch/issues/1626
import nodeFetch from 'node-fetch';

const { log, error, debug } = console;
const fetcher = process.env.UNDICI ? fetch : nodeFetch;
const timeout = ~~process.env.TIMEOUT || 1000;

log(`\nUsing ${process.env.UNDICI ? "undici" : "node-fetch"} with timeout of ${timeout}ms\n`);

// Do some blocking synchronous work (you may need to increase this number if your computer is a lot faster than mine)
async function doSomeWork() {
    let string = "";

    for (let i = 0; i < 1e8; i++) {
        string += `${i}`;

        if (i % 1e6 == 0) {
            string = "";
            debug(`tick: ${i} ${string}`)
        }
    }
}

async function start() {
    try {
        await Promise.all([
            // Requires app to be running for health endpoint
            fetcher("http://localhost:3000/_internal/health", {
                signal: AbortSignal.timeout(timeout),
            }),
            doSomeWork()
        ]);

        log("\nSUCCESS!\n");
    } catch (err) {
        error(err)
    }
}

start();