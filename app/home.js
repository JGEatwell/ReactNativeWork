import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Button, FlatList, Pressable, StyleSheet, Text, View } from "react-native";


const Habits = [
    {id: 1, name: 'Drink Water', streak: 0, completedToday: false},
    {id: 2, name: 'Read', streak: 0, completedToday: false},
    {id: 3, name: 'Stretch', streak: 0, completedToday: false},
]

const HomeScreen = () => {
    const router = useRouter();
    const params = useLocalSearchParams();
    const [habits, setHabits] = useState(Habits);

    useEffect(() => {
        if(params.newHabitName) {
            setHabits(prev => [...prev, {id: Date.now(), name: params.newHabitName, streak: 0, completedToday: false}]);
            router.setParams({ newHabitName: undefined }); // Clear the parameter after adding the habit
        }
    }, [params.newHabitName]);

    const markHabitCompleted = (id) => {
        setHabits(prev => prev.map(habit => 
            habit.id === id && !habit.completedToday ? {...habit, completedToday: true, streak: habit.streak + 1} : habit
        ));
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={habits}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.list}
                renderItem={({ item }) => (
                    <Pressable style={[styles.card, item.completedToday && styles.cardDone]}
                        onPress={() => markHabitCompleted(item.id)}
                    >
                        <Text style={styles.name}>{item.name}</Text>
                        <Text style={styles.streak}>Streak: {item.streak}</Text>
                        {item.completedToday && <Text style={styles.doneLabel}>Completed Today!</Text>}
                    </Pressable>
                )}
            />
                <Pressable style={styles.fab} onPress={() => router.push({ pathname: '/addHabit' })}>
                    <Text style={styles.fabText}>+</Text>
                </Pressable>
            <View style={styles.buttonContainer}>
                <Button
                    title='Profile'
                    onPress={() => router.push({ pathname: '/profile', params: {name: 'Sid'}})}
                />
            </View>
        </View>
    );  

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    list: {
        padding: 16,
        gap: 12,
    },
    card: {
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 12,
        elevation: 2,
    },
    cardDone: {
        backgroundColor: '#e8f5e9',
    },
    name: {
        fontSize: 16,
        fontWeight: '600',
    },
    streak: {
        marginTop: 4,
        color: '#666',
    },
    doneLabel: {
        marginTop: 4,
        color: '#2e7d32',
        fontWeight: '600',
    },
    buttonContainer: {
        margin: 20,
        marginBottom: 40,
        alignSelf: 'stretch',
    },
    fab: {
    position: 'absolute',
    right: 24,
    bottom: 100,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#841584',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
},
fabText: {
    color: 'white',
    fontSize: 28,
    lineHeight: 28,
},
});

export default HomeScreen;