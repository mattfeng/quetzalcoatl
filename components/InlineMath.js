import katex from 'katex'

function InlineMath({ formula }) {
  const katexHtml = katex.renderToString(formula, { inline: true })
  return <span dangerouslySetInnerHTML={{ __html: katexHtml }}></span>
}

export default InlineMath
