import { Stack } from 'expo-router/stack'
import { View, Text } from 'react-native'
import SpiceProvider from './SpiceContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'


export default function Layout() {
    const queryClient = new QueryClient()

    return (
        <QueryClientProvider client={queryClient}>
            <SpiceProvider>
                <Stack>
                    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                </Stack>
            </SpiceProvider>
        </QueryClientProvider>
    )
}