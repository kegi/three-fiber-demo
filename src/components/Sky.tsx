import { useState, useMemo } from 'react'
import { Color } from 'three'
import { useFrame } from 'react-three-fiber'
import { Sky as R3fSky, Stars } from '@react-three/drei'

import { timeToDeg } from '../util/skyTime'

interface SunProps {
    azimuth?: number
    turbidity?: number
    rayleigh?: number
    mieCoefficient?: number
    mieDirectionalG?: number
}

interface StarsProps {
    enabled?: boolean
    depth?: number
    count?: number
    factor?: number
    saturation?: number
    fade?: boolean
}

interface SkyProps {
    distance?: number
    timeAnimation?: boolean
    time?: string
    sun?: SunProps
    stars?: StarsProps
}

const Sky:React.FC<SkyProps> = ({
    distance = 4000,
    timeAnimation = true,
    time : initialTime = '12h00',
    sun = {
        azimuth: 0,
        turbidity: 1,
        rayleigh: 1,
        mieCoefficient: 0.035,
        mieDirectionalG: 0.73,
    },
    stars = {
        enabled: true,
        depth: 50,
        count: 100,
        factor: 30,
        saturation: 0,
        fade: true
    }
}) => {

const speedDay = 0.001
const speedNight = 0.001
const speedSunrise = 0.00005
const speedSunset = 0.00005

const sunriseStart = .995
const sunriseEnd = .055
const sunsetStart = .44
const sunsetEnd = .55
const nightStart = .6
const nightEnd = .9

const [time, setTime] = useState(timeToDeg(initialTime))

useFrame(() => {
    if(!timeAnimation){
        return
    }
    const newTime = time + speed
    setTime(newTime >= 1 ? 0 : newTime)
})

const day = useMemo(() => {
    return time >= sunriseStart || time <= sunsetEnd
}, [time])

const night = useMemo(() => {
    return time >= nightStart && time <= nightEnd
}, [time])

const sunrise = useMemo(() => {
    return time >= sunriseStart || time <= sunriseEnd
}, [time])

const sunset = useMemo(() => {
    return time >= sunsetStart && time <= sunsetEnd
}, [time])

const speed = useMemo(() => {
    if(sunrise){
        return speedSunrise
    }
    if(sunset){
        return speedSunset
    }
    return day ? speedDay : speedNight
}, [day, sunrise, sunset])

const position:[number, number, number] = useMemo(() => {
    const angle = ((time * (Math.PI * 2)) + (Math.PI * 1.5))
    const y = distance * Math.cos(angle)
    const z = distance * Math.sin(angle)

    return [sun.azimuth || 0, y, z]
}, [sun.azimuth, distance, time])

const ambientLightIntensity = useMemo(() => {
    
    const min = .015
    const max = .5
    const returnInRange = (intensity:number) => Math.max(Math.min(intensity, max), min)

    if(sunrise){
        const t = time >= sunriseStart ? time : time + 1
        const intensity = (t - sunriseStart) / ((sunriseEnd + 1) - sunriseStart)
        return returnInRange(intensity)
    }

    if(sunset){
        const total = sunsetEnd - sunsetStart
        const intensity = (sunsetEnd - time) / total
        return returnInRange(intensity)
    }

    return day ? returnInRange(1) : returnInRange(0)
    
}, [time, day, sunrise, sunset])

return (<>
    
    <hemisphereLight
        args={['#fff', '#fff']}
        intensity={ambientLightIntensity}
        color={new Color('#808020')}
        groundColor={new Color('#804A40')}
        position={position}
    />

    <directionalLight
        intensity={ambientLightIntensity}
        color={new Color('#fff')}
        position={position}
        castShadow
    />

    <ambientLight intensity={ambientLightIntensity} />

    <R3fSky
        turbidity={sun.turbidity}
        rayleigh={sun.rayleigh}
        mieCoefficient={sun.mieCoefficient}
        mieDirectionalG={sun.mieDirectionalG}
        distance={distance}
        sunPosition={position}
    />

    {stars.enabled && night && <Stars
        radius={distance}
        depth={stars.depth}
        count={stars.count}
        factor={stars.factor}
        saturation={stars.saturation}
        fade={stars.fade}
    />}
</>)

}

export default Sky
