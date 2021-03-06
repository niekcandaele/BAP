import { graphql } from 'gatsby';
import * as React from 'react';

// styles
const pageStyles = {
  color: "#232129",
  padding: 96,
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
}

// markup
const IndexPage = ({ data }) => {
  console.log(data);
  return (
    <main style={pageStyles}>
      <p>Hey! This is a Gatsby site for the "{data.allStrapiCampaign.nodes[0].Name}" campaign</p>
    </main>
  )
}

export default IndexPage


export const query = graphql`
query MyQuery {
  allStrapiCampaign {
    nodes {
      Name
      mainImage {
        url
      }
    }
  }
}
`