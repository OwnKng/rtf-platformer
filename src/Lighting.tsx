import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import { DirectionalLight, Object3D, SpotLight, Vector3 } from "three"

const offset = new Vector3(0, 1, 0)
const object = new Object3D()

export default function Lighting({ target }: any) {
  const spot = useRef<DirectionalLight>(null!)

  useFrame(({ scene }) => {
    scene.add(object)

    const playerPosition = target.current.translation()
    object.position.copy(playerPosition)

    spot.current.target = object
  })

  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[-5, 10, 5]} castShadow intensity={0.5} />
      <directionalLight
        ref={spot}
        intensity={0.5}
        castShadow
        position={[0, 20, 5]}
      />
    </>
  )
}
