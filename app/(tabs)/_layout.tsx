import { Tabs } from 'expo-router';


export default function TabLayout() {
    return (
        <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home'
                }}
            />
            <Tabs.Screen
                name="event"
                options={{
                    title: 'Event'
                }}
            />
            <Tabs.Screen
                name="sietch"
                options={{
                    title: 'Sietch'
                }}
            />
        </Tabs>
    );
}