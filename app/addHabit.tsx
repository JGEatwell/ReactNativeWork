import AsyncStorage from '@react-native-async-storage/async-storage';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { STORAGE_KEY } from '../constants/storage';
import { useTheme } from '../context/themeContext';
import { Habit } from '../types/habits';

const AddHabitScreen = () => {
    const { habitId, habitName } = useLocalSearchParams<{ habitId?: string; habitName?: string }>();
    const isEditing = !!habitId;
    const [name, setName] = useState(habitName ?? '');
    const router = useRouter();
    const { colours } = useTheme();

    const handleSubmit = async () => {
        if(!name.trim())
            return;
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        const habits: Habit[] = stored ? JSON.parse(stored) : [];

        const updated: Habit[] = isEditing
            ? habits.map(h => h.id === Number(habitId) ? { ...h, name: name.trim() } : h)
            : [...habits, {id: Date.now(), name: name.trim(), streak: 0, completedDates: []}];

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
            <Stack.Screen options={{ title: isEditing ? 'Edit Habit' : 'Add Habit' }} />
            <Text style={styles.label}>Habit Name:</Text>
            <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Enter habit name"
                placeholderTextColor={colours.textMuted}
                autoFocus
            />
            <Button title={isEditing ? 'Save Changes' : 'Add Habit'} onPress={handleSubmit} />
        </View>
    );
};

export default AddHabitScreen;
