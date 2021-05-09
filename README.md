# White labeled static sites


## Running the benchmark

```sh
docker-compose -f docker-compose-deps.yml up -d
docker-compose -f docker-compose-bench.yml up -d
cd packages/benchmark
npm run cypress:open
```

After running the test, reports can be found in `packages/benchmark/reports`