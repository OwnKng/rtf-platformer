import { Canvas } from "@react-three/fiber"
import Player from "./Player"
import { Suspense, useMemo, useRef } from "react"
import { KeyboardControlsEntry, KeyboardControls } from "@react-three/drei"
import Camera from "./Camera"
import { Physics, RigidBody } from "@react-three/rapier"
import { RigidBodyApi } from "@react-three/rapier/dist/declarations/src/types"
import Ground from "./Ground"
import Blocks from "./Block"
import Lighting from "./Lighting"
import * as THREE from "three"

const color = new THREE.Color("#202020")

enum Controls {
  forward = "forward",
  back = "back",
  left = "left",
  right = "right",
  jump = "jump",
}

function App() {
  const map = useMemo<KeyboardControlsEntry<Controls>[]>(
    () => [
      { name: Controls.forward, keys: ["ArrowUp", "w", "W"] },
      { name: Controls.back, keys: ["ArrowDown", "s", "S"] },
      { name: Controls.left, keys: ["ArrowLeft", "a", "A"] },
      { name: Controls.right, keys: ["ArrowRight", "d", "D"] },
      { name: Controls.jump, keys: ["Space"] },
    ],
    []
  )

  const playerRef = useRef<RigidBodyApi>(null!)

  return (
    <div className='App'>
      <KeyboardControls map={map}>
        <Canvas shadows>
          <Suspense>
            <Lighting target={playerRef} />
            <fog attach='fog' color='#202020' near={1} far={10} />
            <Physics>
              <Camera target={playerRef} />
              <Player ref={playerRef} />
              <Ground />
              <Blocks />
            </Physics>
          </Suspense>
        </Canvas>
      </KeyboardControls>
    </div>
  )
}

export default App
