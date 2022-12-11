import { useTexture } from "@react-three/drei"
import { RigidBody } from "@react-three/rapier"
import * as THREE from "three"

export default function Ground() {
  const t = useTexture("ground.png")
  t.wrapS = t.wrapT = THREE.RepeatWrapping
  t.repeat.set(100, 100)

  return (
    <RigidBody type='fixed'>
      <mesh receiveShadow position={[0, 0, 0]} rotation-x={-Math.PI / 2}>
        <boxGeometry args={[100, 100, 0.1]} />
        <meshStandardMaterial map={t} />
      </mesh>
      <mesh receiveShadow position={[0, 5, -5]}>
        <boxGeometry args={[20, 10, 0.1]} />
        <meshBasicMaterial wireframe opacity={0} transparent />
      </mesh>
      <mesh receiveShadow position={[0, 5, 5]}>
        <boxGeometry args={[20, 10, 0.1]} />
        <meshBasicMaterial wireframe opacity={0} transparent />
      </mesh>
      <mesh receiveShadow position={[-10, 5, 0]} rotation-y={-Math.PI / 2}>
        <boxGeometry args={[10, 10, 0.1]} />
        <meshBasicMaterial wireframe opacity={0} transparent />
      </mesh>
      <mesh receiveShadow position={[10, 5, 0]} rotation-y={-Math.PI / 2}>
        <boxGeometry args={[10, 10, 0.1]} />
        <meshBasicMaterial wireframe opacity={0} transparent />
      </mesh>
    </RigidBody>
  )
}
