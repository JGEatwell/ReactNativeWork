import { Ionicons } from '@expo/vector-icons';
import { useMemo } from 'react';
import { Pressable, StyleSheet, Text, View } from "react-native";
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import { useTheme } from '../context/themeContext';
import { Habit } from '../types/habits';
import { getLastNDays, today } from '../utils/date';

type HabitCardProps = {
    habit: Habit;
    onComplete: (id: number) => void;
    onDelete: (id: number) => void;
};

const HabitCard = ({ habit, onComplete, onDelete }: HabitCardProps) => {
    const { colours } = useTheme();
    const completedDates = habit.completedDates || [];
    const isDoneToday = completedDates.includes(today());
    const last7Days = getLastNDays(7);

    const styles = useMemo(() => StyleSheet.create({
        card: {
            backgroundColor: colours.surface,
            padding: 18,
            borderRadius: 16,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.08,
            shadowRadius: 3,
            elevation: 2,
        },
        cardDone: {
            backgroundColor: colours.successBackground,
        },
        cardPressed: {
            opacity: 0.70,
        },
        cardTopRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        deleteAction: {
            backgroundColor: colours.danger,
            justifyContent: 'center',
            alignItems: 'center',
            width: 80,
            borderRadius: 16,
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
            color: colours.text,
        },
        doneLabel: {
            marginTop: 4,
            color: colours.success,
            fontWeight: '600',
        },
        streakStrip: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 14,
        },
        dayColumn: {
            alignItems: 'center',
        },
        dayLabel: {
            fontSize: 10,
            color: colours.textMuted,
            marginBottom: 4,
        },
        dot: {
            width: 10,
            height: 10,
            borderRadius: 5,
            borderWidth: 1,
            borderColor: colours.border,
        },
        dotFilled: {
            backgroundColor: colours.success,
            borderColor: colours.success,
        },
    }), [colours]);

    return (
        <Swipeable renderRightActions={() => (
            <Pressable style={styles.deleteAction} onPress={() => onDelete(habit.id)}>
                <Ionicons name="trash" size={24} color={colours.surface} />
            </Pressable>
        )}>
            <Pressable style={({ pressed }) => [styles.card,
            isDoneToday && styles.cardDone, pressed && styles.cardPressed,]}
                onPress={() => onComplete(habit.id)}>
                <View style={styles.cardTopRow}>
                    <View style={styles.cardInfo}>
                        <Text style={styles.name}>{habit.name}</Text>
                        {isDoneToday && <Text style={styles.doneLabel}>Completed Today!</Text>}
                    </View>
                    <View style={styles.cardStreak}>
                        <Text style={styles.streakText}>Streak: {habit.streak}</Text>
                    </View>
                </View>
                <View style={styles.streakStrip}>
                    {last7Days.map(day => (
                        <View key={day.date} style={styles.dayColumn}>
                            <Text style={styles.dayLabel}>{day.label}</Text>
                            <View style={[styles.dot, completedDates.includes(day.date) && styles.dotFilled]} />
                        </View>
                    ))}
                </View>
            </Pressable>
        </Swipeable>
    );
};

export default HabitCard;