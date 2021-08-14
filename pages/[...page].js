import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import { DynamicMolViewer } from '../components/dynamic'
import Image from '../components/Image'

import { join } from 'path'
import { readFileSync } from 'fs'

const components = {
  MolViewer: DynamicMolViewer,
  Image,
}

function Page({ mdxSource }) {
  return (
    <>
      <MDXRemote {...mdxSource} components={components} />
    </>
  )
}

export async function getServerSideProps({ params, req, res }) {
  const pagePath = params['page'].join('/')

  const source = readFileSync(
    join(process.cwd(), './topics', `${pagePath}.mdx`)
  )
  const mdxSource = await serialize(source)

  return {
    props: {
      mdxSource,
    },
  }
}

export default BookPage
