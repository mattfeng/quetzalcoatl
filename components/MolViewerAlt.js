import { useEffect, useMemo } from 'react'

function makeid(length) {
  var result = ''
  var characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  var charactersLength = characters.length
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

const handleSDF = ($, viewer, uri) => {
  $.ajax(uri, {
    success: function (data) {
      let v = viewer
      v.addModel(data, 'sdf') /* load data */
      v.setStyle({ stick: {} }) /* style all atoms */
      v.zoomTo() /* set camera */
      v.render() /* render scene */
    },
    error: function (hdr, status, err) {
      console.error('Failed to load SDF' + uri + ': ' + err)
    },
  })
}

const handlePDB = ($, viewer, uri) => {
  $.ajax(uri, {
    success: function (data) {
      let v = viewer
      v.addModel(data, 'pdf') /* load data */
      v.setStyle({ cartoon: { color: 'spectrum' } }) /* style all atoms */
      v.zoomTo() /* set camera */
      v.render() /* render scene */
    },
    error: function (hdr, status, err) {
      console.error('Failed to load SDF' + uri + ': ' + err)
    },
  })
}

function MolViewerAlt({ path, type, width, height }) {
  const viewerId = useMemo(() => makeid(8), [])

  const styles = {
    width: width || '600px',
    height: height || '400px',
    position: 'relative',
  }

  useEffect(() => {
    window.$ = require('../public/jquery')
    window.$3Dmol = require('../public/3Dmol-nojquery.js')

    let config = { backgroundColor: 'white' }
    let element = window.$(`#${viewerId}`)

    console.log('MolViewerAlt loading...')
    console.log('MolViewerAlt element:', element)

    let viewer = window.$3Dmol.createViewer(element, config)

    if (type === 'sdf') {
      handleSDF(window.$, viewer, path)
    } else if (type === 'pdb') {
      handlePDB(window.$, viewer, path)
    }
  }, [])

  return <div id={viewerId} style={styles}></div>
}

export default MolViewerAlt
