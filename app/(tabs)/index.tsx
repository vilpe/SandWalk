import { View, Text, StyleSheet, Button } from 'react-native';
import { Pedometer } from 'expo-sensors'
import { useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { SpiceContext } from '../SpiceContext';
import { useQuery } from '@tanstack/react-query';


export default function Tab() {
    const { spice, setSpice } = useContext(SpiceContext)
    const [stepCount, setStepCount] = useState(0)
    const [pastStepCount, setPastStepCount] = useState(0)
    const [pedometerAvailable, setPedometerAvailable] = useState<Boolean>(false)

    const { data: spiceData, error: spiceError, isLoading } = useQuery({
        queryKey: ['spice'],
        queryFn: async () => {
            return await AsyncStorage.getItem('my-spice')
        }
    })

    const checkPedo = async () => {
        try {
            const permission = await Pedometer.requestPermissionsAsync()
            //console.log(permission)
        } catch (e) {
            console.log('error: ', e)
        }
        const isAvailable = await Pedometer.isAvailableAsync()
        setPedometerAvailable(isAvailable)

        const end = new Date()
        const start = new Date()
        start.setDate(end.getDate() - 1) //24 hours ago 

        if (isAvailable === true) {
            return Pedometer.watchStepCount(res => setStepCount(res.steps))
        }
    }
    const gatherSpice = () => {
        const randomAmountOfSpice = Math.floor(Math.random() * 100) //0-99
        setSpice(spice + 1)
    }
    const updateStoredSpice = async () => {
        try {
            const currSpice = await AsyncStorage.getItem('my-spice')
            const spiceString = String(spice)
            console.log('updating spice to: ', spiceString)
            await AsyncStorage.setItem('my-spice', spiceString)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        const stepper = checkPedo()
        //return () => stepper && stepper.remove()
    }, [])

    if (isLoading) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        )
    }
    if (spiceError) {
        return (
            <View style={styles.container}>
                <Text>{spiceError.message}</Text>
            </View>
        )
    }
    return (
        <View style={styles.container}>
            <Text>Current Spice: {spiceData}</Text>
            <View style={styles.innerContainer}>
                <Text style={styles.text}>Pedometer available:{pedometerAvailable.toString()}</Text>
                <Text style={styles.text}>This many steps:</Text>
                <Text style={styles.text}>{stepCount}</Text>
            </View>
            <Button
                onPress={() => { setStepCount(stepCount + 1) }}
                title="Add spice"
            />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    innerContainer: {
        padding: 50,
        margin: 'auto',
        borderColor: '#000',
        borderWidth: 1,
        alignSelf: 'flex-start',

    },
    text: {
        textAlign: 'center',
    }
})