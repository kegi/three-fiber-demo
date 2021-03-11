import { useEffect, useRef, useState } from "react"
import { useFrame, useThree } from "react-three-fiber"
import { Vector3 } from "three"
import { useSphere } from "@react-three/cannon"

import { useKeyboard } from "../hooks/useKeyboard"

interface PlayerProps {
    height ?: number
    position ?: [number, number, number]
    speed?: number
    jumpForce?: number
    mass?: number
}

const frontVector = new Vector3()
const sideVector = new Vector3()
const direction = new Vector3()

const Player: React.FC<PlayerProps> = ({
    height = 5,
    position = [0, 10, 0],
    speed = 8,
    jumpForce = 10,
    mass = 5,
}) => {
    const keys = useKeyboard()
    const movement = {
        forward: keys.has('KeyW') || keys.has('ArrowUp'),
        backward: keys.has('KeyS') || keys.has('ArrowDown'),
        left: keys.has('KeyA') || keys.has('ArrowLeft'),
        right: keys.has('KeyD') || keys.has('ArrowRight'),
    }
    const jump = keys.has('Space')

    const [canJump, setCanJump] = useState(false)

    const [ ref, api ] = useSphere(() => ({ mass, type: 'Dynamic', position, onCollide }))
    const { camera } = useThree()
    const velocity = useRef([0, 0, 0])

    const onCollide = () => {
        setCanJump(true)
    }

    useEffect(() => {
        api.velocity.subscribe((newVelocity) => {
            velocity.current = newVelocity
        })
    }, [api])

    useFrame(() => {
        if(!ref.current){
            return
        }

        const directionVelocity = {
            forward: movement.forward ? 1 : 0,
            backward: movement.backward ? 1 : 0,
            left: movement.left ? 1 : 0,
            right: movement.right ? 1 : 0,
        }

        const frontVelocity = directionVelocity.backward - directionVelocity.forward
        const sideVelocity = directionVelocity.left - directionVelocity.right

        camera.position.copy(ref.current.position)
        camera.position.setY(camera.position.y + height)

        let jumpVelocity = 0
        if(canJump && jump){
            setCanJump(false)
            jumpVelocity = Math.max(jumpForce - velocity.current[1], 0)
        }

        frontVector.set(0, 0, frontVelocity)
        sideVector.set(sideVelocity, 0, 0)
        direction.subVectors(frontVector, sideVector)
            .normalize()
            .multiplyScalar(speed)
            .applyEuler(camera.rotation)
        api.velocity.set(direction.x, velocity.current[1] + jumpVelocity, direction.z)
    })

    return <mesh ref={ref}></mesh>
}

export default Player