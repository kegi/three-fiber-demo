import { useRef, useEffect, useMemo } from 'react'
import { Plane } from '@react-three/drei'
import { PlaneBufferGeometryProps } from 'react-three-fiber'
import { useHeightfield } from '@react-three/cannon'
import { applyHeights } from '../util/terrain'

interface TerrainProps {
    width: number
    length: number
    heights: Float32Array
    unitSize?: number
}

const Terrain:React.FC<TerrainProps> = ({
    width,
    length,
    heights,
    unitSize = 1,
}) => {

    const terrainGeometryRef = useRef<PlaneBufferGeometryProps>()

    const cannonHeight = useMemo(() => {
        const heightfield:any[] = []

        for(let z = 0; z < length + 1; z++){
          const row = []
          for(let x = 0; x < width + 1; x++){
            const index = (x * (width + 1)) + z
            row.push(heights[index])
          }
          heightfield.push(row.reverse())
        }

        return heightfield
    }, [heights, length, width])

    useHeightfield(() => ({
        position: [-width / 2, 0, length / 2],
        mass: 0,
        rotation: [Math.PI * 1.5, 0, 0],
        args: [cannonHeight, { elementSize: 1 }] as any
      }))

    useEffect(() => {
        if(
            !terrainGeometryRef.current?.setAttribute ||
            !terrainGeometryRef.current?.getAttribute ||
            !terrainGeometryRef.current?.attributes?.normal
        ){
            return
        }

        try {
            const { array: positions } = terrainGeometryRef.current.getAttribute('position')
            applyHeights(positions as Float32Array, heights)
            terrainGeometryRef.current.getAttribute('position').needsUpdate = true
        } catch(error) {
            console.error(error)
        }
    }, [heights])

    return (
        <Plane
          rotation-x={Math.PI * 1.5}
          receiveShadow
          castShadow
          >
            <planeBufferGeometry
                ref={terrainGeometryRef}
                args={[width * unitSize, length * unitSize, width, length]}
                attach="geometry"
            />
            <meshPhongMaterial
                attach="material"
                wireframe
            />
        </Plane>
    )
}

export default Terrain