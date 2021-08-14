import { useEffect, useRef } from 'react'

function MolViewerAlt() {
  useEffect(() => {
    window.$ = require('../public/jquery')
    window.$3Dmol = require('../public/3Dmol-nojquery.js')

    console.log('hello')

    let config = { backgroundColor: 'orange' }
    let element = window.$('#molViewer')

    console.log('element', element)

    let viewer = window.$3Dmol.createViewer(element, config)
    viewer.addSphere({
      center: { x: 0, y: 0, z: 0 },
      radius: 10.0,
      color: 'green',
    })
    viewer.zoomTo()
    viewer.render()
    viewer.zoom(0.8, 2000)
  }, [])

  return <div id="molViewer" className="mol-container"></div>
}

export default MolViewerAlt
