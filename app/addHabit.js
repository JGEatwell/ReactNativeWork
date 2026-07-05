import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

const AddHabitScreen = () => {
    const [name, setName] = useState('');
    const router = useRouter();

    const handleAddHabit = () => {
        if(!name.trim())
            return;
        router.navigate({ pathname: '/', params: { newHabitName: name.trim() } });
    };

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
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
    },
});

export default AddHabitScreen;
