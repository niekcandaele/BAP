const { exec } = require('child_process')
const fs = require('fs').promises
const path = require('path')
const PoCs = {
    'gatsby': 3001,
    'next': 3002,
    'react': 3003
}

const TOTAL_RUNS = 50

async function main() {
    const results = []
    for (let i = 0; i < TOTAL_RUNS; i++) {
        console.log(`Starting run ${i}/${TOTAL_RUNS}`);
        const data = await runBenchmark();
        results.push(data)
    }

    await fs.writeFile('./finalReport.json', JSON.stringify(results, null, 4))

}

async function runBenchmark() {
    await runCypress();
    const result = {}
    for (const poc in PoCs) {
        if (Object.hasOwnProperty.call(PoCs, poc)) {
            const port = PoCs[poc];
            const data = await parseResult(port)
            result[poc] = data
        }
    }
    return result
}

// The resulting Lighthouse reports contain way more info than we are interested it
// So we select just the data we will use, to cut down on disk usage and ease of reading data
async function parseResult(port) {
    const raw = await fs.readFile(path.join(__dirname, `reports/http:127.0.0.1:${port}-lighthouse.json`));
    const data = JSON.parse(raw.toString())

    // All units are ms
    return {
        firstContentfulPaint: data.lhr.audits['first-contentful-paint'].numericValue,
        largestContentfulPaint: data.lhr.audits['largest-contentful-paint'].numericValue,
        firstMeaningfulPaint: data.lhr.audits['first-meaningful-paint'].numericValue,
        speedIndex: data.lhr.audits['speed-index'].numericValue,
        estimatedInputLatency: data.lhr.audits['estimated-input-latency'].numericValue,
        totalBlockingTime: data.lhr.audits['total-blocking-time'].numericValue,
        maxPotentialFid: data.lhr.audits['max-potential-fid'].numericValue,
        cumulativeLayoutShift: data.lhr.audits['cumulative-layout-shift'].numericValue,
        firstCpuIdle: data.lhr.audits['first-cpu-idle'].numericValue,
    }
}


function runCypress() {
    const start = Date.now()
    console.log('Starting a Cypress run');
    return new Promise((resolve) => {
        exec("npm run cypress:run", (error) => {
            if (error) {
                console.log(`error: ${error.message}`);
            }
            console.log(`Finished Cypress run - ${Date.now() - start} ms`);
            resolve();

        })
    })
}


main()