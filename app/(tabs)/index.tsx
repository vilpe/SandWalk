import { View, Text, StyleSheet } from 'react-native';
import { Pedometer } from 'expo-sensors'
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Tab() {

    const [stepCount, setStepCount] = useState(0)
    const [pastStepCount, setPastStepCount] = useState(0)
    const [pedometerAvailable, setPedometerAvailable] = useState<Boolean>(false)

    const checkPedo = async () => {
        const checkPermission = await Pedometer.requestPermissionsAsync()
        console.log(checkPermission)
        const isAvailable = await Pedometer.isAvailableAsync()
        setPedometerAvailable(isAvailable)

        const end = new Date()
        const start = new Date()
        start.setDate(end.getDate() - 1) //24 hours ago 

        if (isAvailable === true) {
            return Pedometer.watchStepCount(res => setStepCount(res.steps))
        }
    }

    useEffect(() => {
        const stepper = checkPedo()
        return () => stepper && stepper.remove()
    }, [])

    return (
        <View style={styles.container}>
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