import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import { DynamicMolViewer } from '../components/dynamic'
import Image from '../components/Image'
import axios from 'axios'

import { MDX_CONTENT_URL } from '../config'

const components = {
  MolViewer: DynamicMolViewer,
  Image,
}

function Page({ error, mdxSource }) {
  if (error === 404) {
    return <h1>404 error</h1>
  }

  return (
    <>
      <MDXRemote {...mdxSource} components={components} />
    </>
  )
}

export async function getServerSideProps({ params, req, res }) {
  const pagePath = params['page'].join('/')

  const axiosParams = {
    file: pagePath,
  }

  let source
  try {
    const axiosResp = await axios.get(MDX_CONTENT_URL, { params: axiosParams })
    source = axiosResp.data['source']
  } catch {
    return {
      props: {
        error: 404,
      },
    }
  }

  const mdxSource = await serialize(source)

  return {
    props: {
      mdxSource,
    },
  }
}

export default Page
