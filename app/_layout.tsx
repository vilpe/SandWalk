import { Stack } from 'expo-router/stack'
import { View, Text } from 'react-native'

export default function Layout() {
    return (
        <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
    )
}