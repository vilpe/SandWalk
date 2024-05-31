import { Stack } from 'expo-router/stack'
import { createContext, useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'


interface ISpiceContext {
    spice: number,
    setSpice: (newSpice: number) => void
}
interface SpiceProviderProps {
    children: React.ReactNode;
}

export const SpiceContext = createContext({} as ISpiceContext)

export default function SpiceProvider(props: SpiceProviderProps) {

    const [spice, setSpice] = useState(0)
    const getStoredSpice = async () => {
        try {
            const storedSpice = await AsyncStorage.getItem('my-spice')
            console.log('storage spice: ', storedSpice)
            if (storedSpice !== null) {
                const spiceNum = parseInt(storedSpice)
                setSpice(spiceNum)
            } else {
                await AsyncStorage.setItem('my-spice', '0')
            }
        } catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
        getStoredSpice()
    }, [])

    return (
        <SpiceContext.Provider value={{ spice: spice, setSpice: setSpice }}>
            {props.children}
        </SpiceContext.Provider>
    )
}