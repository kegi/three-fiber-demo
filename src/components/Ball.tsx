import { useMemo } from 'react'
import { useSphere } from '@react-three/cannon'

interface BallProps {
    position: [number, number, number]
    radius ?: number
    segments ?: number
}

interface SphereGeometryInterface {
    position: [number, number, number]
    args: [number | undefined, number | undefined, number | undefined]
}

const Ball:React.FC<BallProps> = ({
    position,
    radius = 1,
    segments = 15
}) => {

const args: SphereGeometryInterface = useMemo(() => {
    return {
        position,
        args: [radius, segments, segments]
    }
}, [position, radius, segments])

const [ ref ] = useSphere(() => ({
    mass: 1,
    position,
    args: radius
}))

return <mesh ref={ref} receiveShadow castShadow>
    <sphereGeometry attach="geometry" {...args} />
    <meshPhongMaterial attach="material" color="hotpink" />
</mesh>
}

export default Ball