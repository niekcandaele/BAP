import 'cypress-audit/commands';

const apps = [
    'http://127.0.0.1:3001', // Gatsby,
    'http://127.0.0.1:3002', // Nextjs
    'http://127.0.0.1:3003', // React traditional
]

describe('Reports', () => {

    for (const app of apps) {
        it('Lighthouse report', () => {
            cy.visit(app)
            // Thresholds are all 0 because we don't care if it passes or not
            // Just need the raw data
            cy.lighthouse({
                performance: 0,
                accessibility: 0,
                "best-practices": 0,
                seo: 0,
                pwa: 0,
            });
        })
    }
})