#!/usr/bin/env node
import * as cdk from '@aws-cdk/core';
import { execSync } from 'child_process';

import { StaticSite } from './static-site';

const config = require('./config.json') as ISiteConfig[]



class MyStaticSiteStack extends cdk.Stack {
    constructor(parent: cdk.App, name: string, props: cdk.StackProps) {
        super(parent, name, props);

        for (const deployment of config) {
            console.log(deployment);
            buildAssets(deployment)
            new StaticSite(this, `Static-${deployment.subDomain}`, {
                domainName: this.node.tryGetContext('domain'),
                siteSubDomain: deployment.subDomain,
                config: deployment
            });
        }

    }
}

const app = new cdk.App();

new MyStaticSiteStack(app, 'MyStaticSite', {
    env: {
        account: '417820299922',
        // Stack must be in us-east-1, because the ACM certificate for a
        // global CloudFront distribution must be requested in us-east-1.
        region: 'us-east-1',
    },
});
app.synth();



async function buildAssets(config: ISiteConfig) {
    // TODO: Should probably become a proper script

    console.log(`BUILDING SITE ${config.subDomain}`);

    // Deleting .cache is important here!
    execSync(`cd ../gatsby && rm -r .cache && GATSBY_CAMPAIGN=${config.subDomain} npm run build`)

    // We move the built folder to /tmp 
    // so we can create and deploy multiple builds
    execSync(`cd ../gatsby && mv public /tmp/gatsby-${config.subDomain}`)
}



export interface ISiteConfig {
    subDomain: string
    modules: IModules
}

interface IModules {
    thankYou: boolean
}

