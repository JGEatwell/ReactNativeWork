import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { colours } from '../constants/colours';

// Fallback seed data, only used if AsyncStorage is empty (i.e. first launch).
const Habits = [
    {id: 1, name: 'Drink Water', streak: 0, lastCompletedDate: null},
    {id: 2, name: 'Read', streak: 0, lastCompletedDate: null},
    {id: 3, name: 'Stretch', streak: 0, lastCompletedDate: null},
]

const STORAGE_KEY = 'habits';
const today = () => new Date().toDateString();

// Note: because this file also sits directly in app/, expo-router registers it
// as its own route at "/home" too - separate from "/" (index.js) which is the
// instance actually used/rendered here. Nothing should navigate to "/home".
const HomeScreen = () => {
    const router = useRouter();
    const params = useLocalSearchParams();
    const [habits, setHabits] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const loadHabits = async () => {
            const stored = await AsyncStorage.getItem(STORAGE_KEY);
            setHabits(stored ? JSON.parse(stored) : Habits);
            setIsLoaded(true);
        }
        loadHabits();
    }, []);

    useEffect(() => {
        if(!isLoaded) return;
        AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(habits));
    }, [habits, isLoaded]);

    useEffect(() => {
        if(params.newHabitName) {
            setHabits(prev => [...prev, {id: Date.now(), name: params.newHabitName, streak: 0, lastCompletedDate: null}]);
            router.setParams({ newHabitName: undefined })
        }
    }, [params.newHabitName]);

    // Immutable update: map returns a new array, and only the tapped habit
    // becomes a new object - required so React detects the change and re-renders.
    // lastCompletedDate guards against incrementing streak more than once per day.
    const markHabitCompleted = (id) => {
        setHabits(prev => prev.map(habit =>
            habit.id === id && habit.lastCompletedDate !== today() ? {...habit, lastCompletedDate: today(), streak: habit.streak + 1} : habit
        ));
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={habits}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.list}
                renderItem={({ item }) => (
                    <Pressable style={({ pressed }) => [styles.card,
                        item.lastCompletedDate === today() && styles.cardDone, pressed && styles.cardPressed,]}
                        onPress={() => markHabitCompleted(item.id)}>
                        <View style={styles.cardInfo}>
                            <Text style={styles.name}>{item.name}</Text>
                            {item.lastCompletedDate === today() && <Text style={styles.doneLabel}>Completed Today!</Text>}
                        </View>
                        <View style={styles.cardStreak}>
                            <Text style={styles.streakText}>Streak: {item.streak}</Text>
                        </View>
                    </Pressable>
                )}
            />
                {/* Floating "+" button - opens the add-habit modal screen */}
               <Pressable style={({ pressed }) => [styles.fab, 
                    pressed && styles.fabPressed]} onPress={() => router.push('/addHabit')}>
                   <Ionicons name="add" size={28} color={colours.surface} />
               </Pressable>
        </View>
    );  

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colours.background,
    },
    list: {
        padding: 16,
        gap: 12,
    },
    card: {
        backgroundColor: colours.surface,
        padding: 16,
        borderRadius: 12,
        elevation: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cardDone: {
        backgroundColor: colours.successBackground,
    },
    cardPressed: {
        opacity: 0.70,
    },
    cardInfo: {
        flexShrink: 1,
        marginRight: 12,
    },
    cardStreak: {
        backgroundColor: colours.primary,
        borderRadius: 16,
        paddingHorizontal: 12,
        paddingVertical: 6,
        minWidth: 40,
        alignItems: 'center',
    },
    streakText: {
        color: colours.surface,
        fontWeight: '600',
        fontSize: 16,
    },
    name: {
        fontSize: 16,
        fontWeight: '600',
    },
    doneLabel: {
        marginTop: 4,
        color: colours.success,
        fontWeight: '600',
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
    }
});

export default HomeScreen;