export const today = (): string => new Date().toDateString();

export type DayInfo = {
    date: string;
    label: string;
};

export const getLastNDays = (n: number): DayInfo[] => {
    const days: DayInfo[] = [];
    for (let i = n - 1; i>= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        days.push({ date: d.toDateString(), label: d.toLocaleDateString('en-GB', { weekday: 'narrow' }) });
    }
    return days;
};