import { graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import * as React from 'react';

const IndexPage = ({ data }) => {
  const image = getImage(data.strapiCampaign.mainImage)
  return (
    <main>
      <p>Hey! This is a Gatsby site for the "{data.strapiCampaign.Name}" campaign</p>
      <GatsbyImage image={image} alt={data.strapiCampaign.Name} />
    </main>
  )
}


export default IndexPage


export const query = graphql`
query MyQuery($campaign: String) {
  strapiCampaign(Name: {eq: $campaign}) {
    mainImage {
      childImageSharp {
        gatsbyImageData
      }
    }
    Name
  }
}
`