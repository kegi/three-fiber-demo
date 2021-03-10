import { useEffect, useState } from "react"

export const useKeyboard = () => {
    const [ keysDown, setKeysDown ] = useState(new Set<string>())

    const handleKeyDown = (event:KeyboardEvent) => {
        setKeysDown(keys => new Set(keys).add(event.code))
    }
    const handleKeyUp = (event:KeyboardEvent) => {
        setKeysDown(keys => {
            const newSet = new Set(keys)
            newSet.delete(event.code)
            return newSet
        })
    }

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown)
        document.addEventListener('keyup', handleKeyUp)

        return () => {
            document.removeEventListener('keydown', handleKeyDown)
            document.removeEventListener('keyup', handleKeyUp)
        }
    }, [])

    return keysDown
}