export type Habit = {
    id: number;
    name: string;
    completedDates?: string[];
    streak: number;
};