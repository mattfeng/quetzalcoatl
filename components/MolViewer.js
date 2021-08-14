import { Stage, Component } from 'react-ngl'
import { useState, useMemo } from 'react'

const _ = require('lodash')

function MolViewer({ path, repr }) {
  if (repr === undefined) {
    repr = 'cartoon'
  }

  const THROTTLE_MS = 300
  const reprList = [{ type: repr }]
  const [cameraState, setCameraState] = useState({})
  const handleCameraMove = useMemo(
    () =>
      _.throttle(
        (nextCameraState) => setCameraState(nextCameraState),
        THROTTLE_MS
      ),
    []
  )
  // referential equality to the throttled function
  // results in smoother movement than the alternative:
  // const handleCameraMove = (nextCameraState) => setCameraState(nextCameraState)

  return (
    <div>
      <Stage
        width="600px"
        height="400px"
        cameraState={cameraState}
        onCameraMove={handleCameraMove}
      >
        <Component path={path} reprList={reprList} />
      </Stage>
      <button onClick={() => setCameraState({})}>Reset camera</button>
      <pre>{JSON.stringify(cameraState, undefined, 2)}</pre>
    </div>
  )
}

export default MolViewer
