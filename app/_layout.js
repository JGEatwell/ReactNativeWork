import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { Pressable } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { colours } from '../constants/colours';

export default function Layout() {
    const router = useRouter();

    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Stack>
          <Stack.Screen
            name="index"
            options={{ title: 'Habit Tracker', headerRight: () => (
              <Pressable style={{ marginRight: 16 }} onPress={() => router.push({ pathname: '/profile'})}>
                <Ionicons name="person-circle-outline" size={28} color={colours.primary} />
            </Pressable>
          ), 
        }}
        />
        <Stack.Screen name="addHabit" options={{ presentation: 'modal', title: 'Add Habit' }} />
      </Stack>
    </GestureHandlerRootView>
    );
}