import { View, Text, StyleSheet } from 'react-native';
import { Pedometer } from 'expo-sensors'
import { useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { SpiceContext } from '../SpiceContext';


export default function Tab() {
    const { spice, setSpice } = useContext(SpiceContext)
    const [stepCount, setStepCount] = useState(0)
    const [pastStepCount, setPastStepCount] = useState(0)
    const [pedometerAvailable, setPedometerAvailable] = useState<Boolean>(false)


    const checkPedo = async () => {
        try {
            const permission = await Pedometer.requestPermissionsAsync()
            //console.log(permission)
        } catch (e) {
            console.log(e)
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
            await AsyncStorage.setItem('my-spice', spiceString)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        const stepper = checkPedo()
        //return () => stepper && stepper.remove()
    }, [])
    useEffect(() => {
        gatherSpice()
        updateStoredSpice()
    }, [stepCount])

    return (
        <View style={styles.container}>
            <Text>Current Spice: {spice}</Text>
            <View style={styles.innerContainer}>
                <Text style={styles.text}>Pedometer available:{pedometerAvailable.toString()}</Text>
                <Text style={styles.text}>This many steps:</Text>
                <Text style={styles.text}>{stepCount}</Text>
            </View>
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