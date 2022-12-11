import { useKeyboardControls } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { RigidBody, useRapier, CuboidCollider } from "@react-three/rapier"
import { forwardRef, useRef } from "react"
import * as THREE from "three"
import * as RAPIER from "@dimforge/rapier3d-compat"
import Sprite from "./Sprite"
import { RigidBodyApi } from "@react-three/rapier/dist/declarations/src/types"

const SPEED = 5
const direction = new THREE.Vector3()
const frontVector = new THREE.Vector3()
const sideVector = new THREE.Vector3()

const Player = forwardRef<RigidBodyApi, any>((_, ref) => {
  const group = useRef<THREE.Group>(null!)

  const rapier = useRapier()

  const [, get] = useKeyboardControls()

  useFrame(() => {
    if (ref) {
      //@ts-ignore
      const player = ref.current

      const { forward, left, right, back, jump } = get()

      const velocity = player.linvel()

      //* movement
      //@ts-ignore
      frontVector.set(0, 0, back - forward)
      //@ts-ignore
      sideVector.set(left - right, 0, 0)
      direction
        .subVectors(frontVector, sideVector)
        .normalize()
        .multiplyScalar(SPEED)

      player.setLinvel({ x: direction.x, y: velocity.y, z: direction.z })

      //* sprite
      group.current.position.copy(player.translation())

      //* jumping
      const world = rapier.world.raw()
      const ray = new RAPIER.Ray(player.translation(), { x: 0, y: -1, z: 0 })
      const maxToi = 10
      const solid = false
      const hit = world.castRay(ray, maxToi, solid)

      const grounded = hit && hit.collider && Math.abs(hit.toi) < 0.25

      if (jump && grounded) player.setLinvel({ x: 0, y: 5, z: 0 })
    }
  })

  return (
    <>
      <RigidBody
        ref={ref}
        type='dynamic'
        enabledRotations={[false, false, false]}
        mass={1}
        colliders={false}
        position={[0, 2, 4]}
      >
        <CuboidCollider args={[0.18, 0.25, 0.05]} />
      </RigidBody>
      <group ref={group}>
        <Sprite />
        <mesh castShadow>
          <cylinderGeometry args={[0.2, 0.2, 0.2, 8]} />
          <meshBasicMaterial transparent opacity={0} />
        </mesh>
      </group>
    </>
  )
})

export default Player
