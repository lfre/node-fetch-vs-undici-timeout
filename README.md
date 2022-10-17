# node-fetch-vs-undici-timeout
Tests the timeout behavior gotcha in [node-fetch](https://github.com/node-fetch/node-fetch/issues/1626)

Update the value "1e8" in the code to increase the load.

## Environment Variables

- `UNDICI` enables the native fetch. Requires Node 18+.
- `TIMEOUT` changes the timeout value. Default is 1000.
