import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { colours } from '../constants/colours';
import { STORAGE_KEY } from '../constants/storage';

const AddHabitScreen = () => {
    const [name, setName] = useState('');
    const router = useRouter();

    const handleAddHabit = async () => {
        if(!name.trim())
            return;
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        const habits = stored ? JSON.parse(stored) : [];
        const updated = [...habits, {id: Date.now(), name: name.trim(), streak: 0, lastCompletedDate: null}];
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        router.back();
    }

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Habit Name:</Text>
            <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Enter habit name"
                autoFocus
            />
            <Button title="Add Habit" onPress={handleAddHabit} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        gap: 12,
        justifyContent: 'center',
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
    },
    input: {
        borderWidth: 1,
        borderColor: colours.border,
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
    },
});

export default AddHabitScreen;
