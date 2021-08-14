import { useEffect, useRef } from 'react'

function MolViewerAlt() {
  const styles = {
    width: '400px',
    height: '300px',
  }
  useEffect(() => {
    window.$ = require('../public/jquery')
    window.$3Dmol = require('../public/3Dmol-nojquery.js')

    console.log('hello')

    let config = { backgroundColor: 'white' }
    let element = window.$('#molViewer')

    console.log('element', element)

    let viewer = window.$3Dmol.createViewer(element, config)

    let uri =
      'https://raw.githubusercontent.com/openbioscience/biochem-book-assets/main/imatinib.sdf'
    window.$.ajax(uri, {
      success: function (data) {
        let v = viewer
        v.addModel(data, 'sdf') /* load data */
        v.setStyle({ stick: {} }) /* style all atoms */
        v.zoomTo() /* set camera */
        v.render() /* render scene */
        v.zoom(1.2, 1000) /* slight zoom */
      },
      error: function (hdr, status, err) {
        console.error('Failed to load SDF' + uri + ': ' + err)
      },
    })
  }, [])

  return <div id="molViewer" style={styles}></div>
}

export default MolViewerAlt
