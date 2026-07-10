import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Haptics from 'expo-haptics';
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import HabitCard from '../Component/habitCard';
import { STORAGE_KEY } from '../constants/storage';
import { useTheme } from '../context/themeContext';
import { today } from '../utils/date';

// Fallback seed data, only used if AsyncStorage is empty (i.e. first launch).
const Habits = [
    { id: 1, name: 'Drink Water', streak: 0, completedDates: []},
    { id: 2, name: 'Read', streak: 0, completedDates: [] },
    { id: 3, name: 'Stretch', streak: 0, completedDates: [] },
]

// Note: because this file also sits directly in app/, expo-router registers it
// as its own route at "/home" too - separate from "/" (index.js) which is the
// instance actually used/rendered here. Nothing should navigate to "/home".
const HomeScreen = () => {
    const router = useRouter();
    const [habits, setHabits] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const { colours } = useTheme();

    useFocusEffect(
        useCallback(() => {
            const loadHabits = async () => {
                const stored = await AsyncStorage.getItem(STORAGE_KEY);
                setHabits(stored ? JSON.parse(stored) : Habits);
                setIsLoaded(true);
            }
            loadHabits();
        }, [])
    );

    useEffect(() => {
        if (!isLoaded) return;
        AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(habits));
    }, [habits, isLoaded]);

    // Immutable update: map returns a new array, and only the tapped habit
    // becomes a new object - required so React detects the change and re-renders.
    // completedDates guards against incrementing streak more than once per day.
    const markHabitCompleted = (id) => {
        const habit = habits.find(h => h.id === id);
        const alreadyDoneToday = habit && (habit.completedDates || []).includes(today());
        if (habit && !alreadyDoneToday) {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        }
        setHabits(prev => prev.map(h =>
            h.id === id && !(h.completedDates || []).includes(today())
                ? { ...h, completedDates: [...(h.completedDates || []), today()], streak: h.streak + 1 }
                : h
        ));
    }


const deleteHabit = (id) => {
    setHabits(prev => prev.filter(habit => habit.id !== id));
}

const styles = useMemo(() => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colours.background,
    },
    list: {
        padding: 16,
        gap: 14,
    },
    fab: {
        position: 'absolute',
        right: 24,
        bottom: 100,
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: colours.primary,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
    },
    fabPressed: {
        opacity: 0.70,
    },
}), [colours]);

return (
    <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
        <FlatList
            data={habits}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.list}
            renderItem={({ item }) => (
                <HabitCard habit={item} onComplete={markHabitCompleted} onDelete={deleteHabit} />
            )}
        />
        {/* Floating "+" button - opens the add-habit modal screen */}
        <Pressable style={({ pressed }) => [styles.fab,
        pressed && styles.fabPressed]} onPress={() => router.push('/addHabit')}>
            <Ionicons name="add" size={28} color={colours.surface} />
        </Pressable>
    </SafeAreaView>
);
}

export default HomeScreen;