import { useRef } from "react"
import * as THREE from "three"
import { useKeyboardControls, useTexture } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"

const hFrames = 10
const vFrames = 48

const animationSpeed = 10

export default function Sprite() {
  const texture = useTexture("Hero.png")
  texture.wrapS = THREE.RepeatWrapping
  texture.repeat.set(1 / hFrames, 1 / vFrames)
  texture.magFilter = THREE.NearestFilter

  const material = useRef<THREE.SpriteMaterial>(null!)

  const [, get] = useKeyboardControls()

  useFrame(({ clock }) => {
    const { forward, left, right, back } = get()
    const spriteMaterial = material.current

    if (spriteMaterial.map) {
      if (forward) {
        spriteMaterial.map.offset.y = 41 / vFrames
        spriteMaterial.map.offset.x =
          (Math.floor(clock.elapsedTime * animationSpeed) % 8) / hFrames
      }

      if (back) {
        spriteMaterial.map.offset.y = 43 / vFrames
        spriteMaterial.map.offset.x =
          (Math.floor(clock.elapsedTime * animationSpeed) % 8) / hFrames
      }

      if (right) {
        spriteMaterial.map.offset.y = 42 / vFrames
        spriteMaterial.map.offset.x =
          (Math.floor(clock.elapsedTime * animationSpeed) % 8) / hFrames
      }

      if (left) {
        spriteMaterial.map.offset.y = 40 / vFrames
        spriteMaterial.map.offset.x =
          (Math.floor(clock.elapsedTime * animationSpeed) % 8) / hFrames
      }
    }
  })

  return (
    <sprite>
      <spriteMaterial ref={material} map={texture} />
    </sprite>
  )
}
