# White labeled static sites


## Running the benchmark

The benchmark script will do multiple runs which can take a long time, you can adjust the const at the top on the script to limit how many runs it will do.

```sh
docker-compose -f docker-compose-deps.yml up -d
docker-compose -f docker-compose-bench.yml up -d
cd packages/benchmark
npm ci
node runBenchmark.js
```

After running the test, reports can be found in `packages/benchmark/reports`