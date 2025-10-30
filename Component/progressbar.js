import React, { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

const ProgressBar = ({progress}) => (
    <View style={styles.barContainer}>
        <View style={[styles.bar, {flex: progress}]} />
        <View style={[styles.barBackground, {flex: 100 - progress}]} />
    </View>
);

function GoalProgress() {
    const target = 100;
    const [current, setCurrent] = useState(0);

    const incrementProgress = () => {
        if(target - current <= 20)
            setCurrent(prev => Math.min(prev + 10, target));
        else
            setCurrent(prev => Math.min(prev + 5, target));
    }

const progress = (current / target) * 100;

return (
    <View style={styles.container}>
        <Text>Goal: {target}</Text>
        <Text>Current: {current}</Text>
        <ProgressBar progress={progress}/>
        <Button title="increment" onPress={incrementProgress}/>
        {current >= target && <Text>Goal Achieved!</Text>}
    </View>
    )
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        alignItems: 'center',
    },
    barContainer: {
        flexDirection: 'row',
        height: 20,
        width: '80%',
        backgroundColor: '#fc0000',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#333',
        marginVertical: 20,
        overflow: 'hidden',
    },
    bar: {
        height: '100%',
        backgroundColor: '#4caf50',
    },
    barBackground: {
        backgroundColor: '#eee',
        height: '100%',
    },
});

export default GoalProgress;