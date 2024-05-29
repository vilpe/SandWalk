import { Stack } from 'expo-router/stack'
import { View, Text } from 'react-native'
import SpiceProvider from './SpiceContext'


export default function Layout() {

    return (
        <SpiceProvider>
            <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
        </SpiceProvider>
    )
}