module.exports = {
  siteMetadata: {
    title: "Gatsby",
  },
  plugins: [
    {
      resolve: 'gatsby-source-strapi',
      options: {
        apiURL: 'http://127.0.0.1:1337',
        contentTypes: [ // List of the Content Types you want to be able to request from Gatsby.
          'campaign'
        ],
        queryLimit: 1000,
      },
    },
  ],
};
