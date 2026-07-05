import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Button, FlatList, Pressable, StyleSheet, Text, View } from "react-native";


const Habits = [
    {id: 1, name: 'Drink Water', streak: 0, completedToday: false},
    {id: 2, name: 'Read', streak: 0, completedToday: false},
    {id: 3, name: 'Stretch', streak: 0, completedToday: false},
]

const HomeScreen = () => {
    const router = useRouter();
    const [habits, setHabits] = useState(Habits);

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
});

export default HomeScreen;