export const today = () => new Date().toDateString();

export const getLastNDays = (n) => {
    const days = [];
    for (let i = n - 1; i>= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        days.push({ date: d.toDateString(), label: d.toLocaleDateString('en-GB', { weekday: 'narrow' }) });
    }
    return days;
}