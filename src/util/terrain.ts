import SimplexNoise from 'simplex-noise'

export enum AXIS {
    x = 0,
    y = 2,
    z = 1,
}

interface SimplexSettings {
    smoothness ?: number
    elevation ?: number
}

export const applyHeights = (
    positions:Float32Array,
    heights:Float32Array,
    axis = AXIS.y
) => {
    if(positions.length !== heights.length * 3){
        console.log(positions.length, heights.length)
        throw new Error('heights doesn\'t match the geometry size')
    }

    heights.forEach((height, index) => {
        positions[(index * 3) + axis] = height
    })
}

export const generateRandomHeights = (width:number, length:number, time:number = 0) => {
    const size = (width + 1) * (length + 1)
    const heights = Array(size).fill(undefined).map((_, index) => {

        const y = Math.floor(index / (width + 1))
        const x = index - (y * (width + 1))

        return Math.cos(((x / width) * ((Math.PI * 2) * 2)) + time) * Math.cos(((y / length) * ((Math.PI * 2) * 2)) + time)
    })

    return new Float32Array(heights)
}

export const generateSimplexNoise = (width:number, length:number, {
    smoothness = 2,
    elevation = 10,
}:SimplexSettings = {}) => {
    const simplex = new SimplexNoise()
    const size = (width + 1) * (length + 1)

    const heights = Array(size).fill(undefined).map((_, index) => {

        const y = Math.floor(index / (width + 1))
        const x = index - (y * (width + 1))

        return simplex.noise2D(
            (x / width) * smoothness,
            (y / length) * smoothness,
        ) * elevation
    })
    return new Float32Array(heights)
}

export const getCenterAltitude = (
    heights:Float32Array,
    width: number,
    length: number
) => {
    const x = Math.round((width + 1) / 2)
    const z = Math.round((length + 1) / 2)
    const index = (z * (width + 1)) + x
    return heights[index]
}

const randomInteger = (min: number, max: number) => Math.floor(Math.random() * (max - min) ) + min

export const getContacts  = (
    heights:Float32Array,
    width:number,
    length:number,
    nb:number,
    minLevel = 1,
    unitSize:number = 1
) => {
    const contacts = []

    for(let i = 0; i < nb; i++){

        const x = randomInteger(0, width + 1)
        const z = randomInteger(0, length + 1)

        const index = (z * (width + 1)) + x
        
        const y = heights[index]

        if(y <= minLevel){
            i--
            continue
        }

        const halfWidth = width / 2
        const halfLength = length / 2

        contacts.push({
            x: (x - halfWidth) * unitSize,
            y,
            z: (z - halfLength) * unitSize,
        })
    }

    return contacts
}