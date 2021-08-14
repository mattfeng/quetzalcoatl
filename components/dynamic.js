import dynamic from 'next/dynamic'

export const DynamicMolViewer = dynamic(() => import('./MolViewer'), {
  ssr: false,
})

export const DynamicMolViewerAlt = dynamic(() => import('./MolViewerAlt'), {
  ssr: false,
})
