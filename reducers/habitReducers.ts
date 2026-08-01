import { Habit } from '../types/habits';
import { today } from '../utils/date';

export type HabitAction =
    | { type: 'ADD_HABIT'; payload: Habit[] }
    | { type: 'COMPLETE_HABIT'; id: number }
    | { type: 'DELETE_HABIT'; id: number }
    | { type: 'RESTORE_HABIT'; habit: Habit; index: number };

export function habitsReducer(state: Habit[], action: HabitAction): Habit[] {
    switch (action.type) {
        case 'ADD_HABIT':
            return action.payload;
        case 'COMPLETE_HABIT':
            return state.map(habit => habit.id === action.id &&
                !(habit.completedDates || []).includes(today())
                ?{ ...habit, completedDates: [...habit.completedDates || [], today()], streak: habit.streak + 1 }
                : habit
            );
        case 'DELETE_HABIT':
            return state.filter(habit => habit.id !== action.id);
        case 'RESTORE_HABIT': {
            const next = [...state];
            next.splice(action.index, 0, action.habit);
            return next;
        }
        default:
            return state;
    }
}