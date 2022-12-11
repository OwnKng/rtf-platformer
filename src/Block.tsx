import { RigidBody } from "@react-three/rapier"
import { useTexture } from "@react-three/drei"
import * as THREE from "three"

const positions = [
  [0, 0, 0],
  [0, 1, 0],
  [0, 2, 0],
  [0, 0, 1],
  [0, 1, 1],
  [0, 1, 1],
  [1, 0, 1],
  [1, 0, 0],
  [1, 1, 0],
  [1, 2, 0],
  [1, 3, 0],
  [1, 0, -1],
  [1, 1, -1],
  [1, 2, -1],
  [1, 3, -1],
  [1, 1, -2],
  [1, 2, -2],
  [1, 3, -2],
  [0, 0, -2],
  [0, 1, -2],
  [0, 2, -2],
  [0, 3, -2],
  [0, 4, -2],
  [0, 5, -2],
  [1, 2, -1],
  [1, 3, -1],
  [1, 4, -2],
  [0, 0, -1],
  [0, 1, -1],
  [0, 2, -1],
  [0, 3, -1],
  [0, 4, -1],
]

export default function Blocks() {
  return (
    <RigidBody type='fixed' colliders='cuboid' position={[0, 0.5, 0]}>
      {positions.map((coords: any, index) => (
        <Block key={`block-${index}`} position={coords} />
      ))}
    </RigidBody>
  )
}

const Block = ({
  position,
  ...props
}: {
  position: [number, number, number]
}) => {
  const t = useTexture("platform.png")

  return (
    <mesh position={position} {...props} receiveShadow castShadow>
      <boxGeometry />
      <meshStandardMaterial map={t} />
    </mesh>
  )
}
