import { Canvas } from 'react-three-fiber'
import { PointerLockControls } from '@react-three/drei'
import { Physics } from '@react-three/cannon'

import { generateSimplexNoise } from '../util/terrain'
import Sky from './Sky'
import Terrain from './Terrain'
import Player from './Player'
import Ball from './Ball'


const width = 100
const length = 100
const smoothness = 4
const elevation = 3

const heights = generateSimplexNoise(width, length, { smoothness, elevation })

const App:React.FC = () => {

  return (
    <div className="canvas-fullscreen-container">
      <Canvas
        colorManagement
        shadowMap
        camera={{ position: [-1, 2, 5], fov: 50 }}
      >

        <hemisphereLight intensity={0.35} />
        <spotLight position={[10, 10, 10]} angle={0.3} penumbra={1} intensity={2} castShadow />

        <Physics>
          
          <Sky timeAnimation={false} time="5h55" />

          <Terrain width={width} length={length} heights={heights}/>

          <Player />

          <Ball position={[12, 10, -12]} />
          <Ball position={[-12, 10, -12]} />
          <Ball position={[12, 10, 12]} />
          <Ball position={[-12, 10, 12]} />
          
        </Physics>

        <PointerLockControls />
      </Canvas>
    </div>
  )
}

export default App