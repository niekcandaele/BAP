require('dotenv').config()
const fs = require('fs');
const Handlebars = require('handlebars');
const { Octokit } = require('@octokit/rest');
const path = require('path')
const octokit = new Octokit({
    auth: process.env.GH_TOKEN
});

const templateString = fs.readFileSync(path.join(__dirname, './template.handlebars')).toString();


async function main() {
    let commitsData = []
    const since = new Date();
    const pastDate = since.getDate() - 7;
    since.setDate(pastDate);

    console.log(`Getting commits since ${since.toISOString()}`);

    const stampixRepos = await octokit.repos.listForOrg({ org: 'stampix', });
    // Get all my commits in Stampix repos
    for (const repo of stampixRepos.data) {
        const branches = await octokit.repos.listBranches({
            owner: 'stampix',
            repo: repo.name,
        })

        for (const branch of branches.data) {
            let commits = await octokit.repos.listCommits({
                owner: 'stampix',
                repo: repo.name,
                author: 'niekcandaele@gmail.com',
                sha: branch.name,
                per_page: 100,
                since
            });
            commits = commits.data.map(c => {
                return {
                    date: new Date(c.commit.committer.date),
                    message: c.commit.message,
                    repo: `stampix/${repo.name}/${branch.name}`
                }
            })
            console.log(`Found ${commits.length} commits for repo ${repo.name} on branch ${branch.name}`);
            commitsData = commitsData.concat(commits)
        }
    }

    // Get my commits in BAP repo
    let commits = await octokit.repos.listCommits({
        owner: 'niekcandaele',
        repo: 'BAP',
        author: 'niekcandaele@gmail.com',
        since
    });
    commits = commits.data.map(c => {
        return {
            date: new Date(c.commit.committer.date),
            message: c.commit.message,
            repo: `niekcandaele/BAP`
        }
    })
    commitsData = commitsData.concat(commits)

    commitsData = getUniqueCommits(commitsData)
    console.log(`Found ${commitsData.length} commits, you busy bee!`);

    commitsData = commitsData
        .sort(function (a, b) {
            return a.date.getTime() - b.date.getTime();
        })
        .map(c => {
            c.date = c.date.toISOString();
            return c
        })

    const compiled = Handlebars.compile(templateString);
    const result = compiled({ commits: commitsData })
    const now = new Date()

    fs.writeFileSync(path.join(__dirname, `reports/${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}.md`), result);
}

main().catch(console.error)


function getUniqueCommits(array) {
    let ids = new Set();
    return array.filter(function (item) {
        if (!ids.has(item.message)) {
            ids.add(item.message);
            return true;
        }
        return false;
    });
}