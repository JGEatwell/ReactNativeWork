import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { STORAGE_KEY } from '../constants/storage';
import { useTheme } from '../context/themeContext';
import { Habit } from '../types/habits';

const AddHabitScreen = () => {
    const [name, setName] = useState('');
    const router = useRouter();
    const { colours } = useTheme();

    const handleAddHabit = async () => {
        if(!name.trim())
            return;
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        const habits: Habit[] = stored ? JSON.parse(stored) : [];
        const updated: Habit[] = [...habits, {id: Date.now(), name: name.trim(), streak: 0, completedDates: []}];
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        router.back();
    }

    const styles = useMemo(() => StyleSheet.create({
        container: {
            flex: 1,
            padding: 20,
            gap: 12,
            justifyContent: 'center',
            backgroundColor: colours.background,
        },
        label: {
            fontSize: 16,
            fontWeight: '600',
            color: colours.text,
        },
        input: {
            borderWidth: 1,
            borderColor: colours.border,
            borderRadius: 8,
            padding: 12,
            fontSize: 16,
            color: colours.text,
        },
    }), [colours]);

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Habit Name:</Text>
            <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Enter habit name"
                placeholderTextColor={colours.textMuted}
                autoFocus
            />
            <Button title="Add Habit" onPress={handleAddHabit} />
        </View>
    );
};

export default AddHabitScreen;
