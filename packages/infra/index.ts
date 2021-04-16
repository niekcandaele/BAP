#!/usr/bin/env node
import * as cdk from '@aws-cdk/core';
import { execSync } from 'child_process';

import { StaticSite } from './static-site';

const config = require('./config.json') as ISiteConfig[]



class MyStaticSiteStack extends cdk.Stack {
    constructor(parent: cdk.App, name: string, props: IProps) {
        super(parent, name, props);


        new StaticSite(this, `Static-${props.deployment.subDomain}`, {
            domainName: this.node.tryGetContext('domain'),
            siteSubDomain: props.deployment.subDomain,
            config: props.deployment
        });

    }
}

for (const deployment of config) {
    const app = new cdk.App();

    console.log(deployment);
    buildAssets(deployment)

    new MyStaticSiteStack(app, 'MyStaticSite', {
        env: {
            account: '417820299922',
            // Stack must be in us-east-1, because the ACM certificate for a
            // global CloudFront distribution must be requested in us-east-1.
            region: 'us-east-1',
        },
        deployment: deployment
    });
    app.synth();

}


async function buildAssets(config: ISiteConfig) {

    console.log(`BUILDING SITE ${config.subDomain}`);

    // TODO: Should probably become a proper script
    execSync('cd ../gatsby && npm run build')
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

interface IProps extends cdk.StackProps {
    deployment: ISiteConfig
}