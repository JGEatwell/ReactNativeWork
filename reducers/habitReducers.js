import { today } from '../utils/date';

export function habitsReducer(state, action) {
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
        default:
            return state;
    }
}