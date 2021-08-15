import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import { DynamicMolViewer, DynamicMolViewerAlt } from '../components/dynamic'
import Image from '../components/Image'
import InlineMath from '../components/InlineMath'
import axios from 'axios'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'

require('katex/dist/katex.min.css')
require('katex/dist/contrib/mhchem.js')

import { MDX_CONTENT_URL } from '../config'

const components = {
  MolViewer: DynamicMolViewer,
  ThreeDMol: DynamicMolViewerAlt,
  M: InlineMath,
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

  const mdxSource = await serialize(source, {
    mdxOptions: {
      remarkPlugins: [remarkMath],
      rehypePlugins: [[rehypeKatex, { strict: 'ignore' }]],
    },
  })

  return {
    props: {
      mdxSource,
    },
  }
}

export default Page
