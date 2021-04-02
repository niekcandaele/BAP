import 'cypress-audit/commands';

describe('Performance', () => {
    it('Lighthouse report', () => {
        cy.visit('http://127.0.0.1:3001')
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

    it('Accessibility report', () => {
        cy.visit('http://127.0.0.1:3001')
        cy.pa11y();
    })
})