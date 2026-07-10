import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Pressable } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ThemeProvider, useTheme } from '../context/themeContext';

function Navigation() {
    const router = useRouter();
    const { colours, isDark, toggleTheme } = useTheme();

    return (
      <>
        <StatusBar style={isDark ? 'light' : 'dark'} />
        <Stack>
            <Stack.Screen
                name="index"
                options={{
                    title: 'Habit Tracker',
                    headerStyle: { backgroundColor: colours.surface },
                    headerTintColor: colours.text,
                    headerLeft: () => (
                        <Pressable style={{ marginLeft: 8, marginRight: 8}} onPress={toggleTheme}>
                            <Ionicons name={isDark ? 'sunny-outline' : 'moon-outline'} size={24} color={colours.primary} />
                        </Pressable>
                    ),
                    headerRight: () => (
                        <Pressable style={{ marginRight: 16 }} onPress={() => router.push({ pathname: '/profile' })}>
                            <Ionicons name="person-circle-outline" size={28} color={colours.primary} />
                        </Pressable>
                    ),
                }}
            />
            <Stack.Screen
                name="addHabit"
                options={{
                    presentation: 'modal',
                    title: 'Add Habit',
                    headerStyle: { backgroundColor: colours.surface },
                    headerTintColor: colours.text,
                }}
            />
            <Stack.Screen
                name="profile"
                options={{
                    headerStyle: { backgroundColor: colours.surface },
                    headerTintColor: colours.text,
                }}
            />
        </Stack>
      </>
    );
}

export default function Layout() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <ThemeProvider>
                <Navigation />
            </ThemeProvider>
        </GestureHandlerRootView>
    );
}