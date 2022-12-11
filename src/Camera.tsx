import * as THREE from "three"
import { useRef } from "react"
import { useFrame } from "@react-three/fiber"

export default function ThirdPersonCamera({ target }: any) {
  const calculateIdealOffset = (target: any) =>
    new THREE.Vector3(0, 2, 3)
      .applyQuaternion(target.rotation())
      .add(target.translation())

  const calculateIdealLookAt = (target: any) => target.translation()

  const currentTarget = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 0))

  return useFrame(({ camera }) => {
    const idealOffset = calculateIdealOffset(target.current)
    camera.position.lerp(idealOffset, 0.1)

    currentTarget.current.lerp(calculateIdealLookAt(target.current), 0.1)

    camera.lookAt(currentTarget.current)
  })
}
