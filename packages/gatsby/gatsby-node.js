/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

exports.onCreatePage = ({ page, actions }) => {
    const { createPage, deletePage } = actions;

    deletePage(page);
    createPage({
        ...page,
        context: {
            campaign: process.env.GATSBY_CAMPAIGN
        }
    });
};