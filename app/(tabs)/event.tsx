import { View, Text, StyleSheet, Pressable } from 'react-native'; import * as Haptics from 'expo-haptics'


export default function Tab() {
    return (
        <View>
            <Text>Worm incoming!</Text>
            <Pressable
                style={styles.Pressable}
                onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
                }}
            >
                <Text style={styles.text}>
                    Rumble
                </Text>
            </Pressable>
            <Pressable
                style={styles.Pressable}
                onPress={() => {
                    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
                }}
            >
                <Text style={styles.text}>
                    Tumble
                </Text>
            </Pressable>
        </View>
    )
}
const styles = StyleSheet.create({
    Pressable: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'black',
        marginTop: 20,
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
})