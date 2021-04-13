import Head from 'next/head';
import Image from 'next/image';

import { fetchAPI } from '../lib';

export default function Home({ all, preview }) {

  // We need a custom loader here because next tries to do smart stuff 
  // It appends width and quality params to the request
  // And strapi doesnt understand that
  // We could make it work properly (GQL API would support this I think)
  // But it's just a PoC ¯\_(ツ)_/¯
  const imgLoader = ({ src, width, quality }) => {
    return `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${all[0].mainImage.formats.large.url}`
  }

  return (
    <div className="container">
      <Head>
        <title>Nextjs PoC</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <p>{all[0].Name}</p>

      <Image
        src={`aaa`}
        loader={imgLoader}
        alt="testing"
        layout="fill"
      />

    </div>
  )
}

export async function getStaticProps({ preview = null }) {

  const all = await fetchAPI('campaigns')
  return {
    props: { all, preview },
  }
}
