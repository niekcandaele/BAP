require("dotenv").config()
module.exports = {
  siteMetadata: {
    title: "Gatsby",
  },
  plugins: [
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`, // Needed for dynamic images
    {
      resolve: 'gatsby-source-strapi',
      options: {
        apiURL: process.env.GATSBY_STRAPI_URL,
        contentTypes: [ // List of the Content Types you want to be able to request from Gatsby.
          'campaign'
        ],
        queryLimit: 1000,
      },
    },
  ],
};
