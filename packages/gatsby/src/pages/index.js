import { graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import * as React from 'react';

// styles
const pageStyles = {
  color: "#232129",
  padding: 96,
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
}

// markup
const IndexPage = ({ data }) => {
  const image = getImage(data.strapiCampaign.mainImage)
  return (
    <main style={pageStyles}>
      <p>Hey! This is a Gatsby site for the "{data.strapiCampaign.Name}" campaign</p>
      <GatsbyImage image={image} alt={data.strapiCampaign.Name} />
    </main>
  )
}

export default IndexPage


export const query = graphql`
query MyQuery {
  strapiCampaign {
    mainImage {
      childImageSharp {
        gatsbyImageData
      }
    }
    Name
  }
}

`