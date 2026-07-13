import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowBanner: true,
        shouldPlaySound: true,
        shouldShowList: true,
        shouldSetBadge: false,
    }),
});

export const scheduleReminder = async (): Promise<boolean> => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
        return false;
    }

    await Notifications.scheduleNotificationAsync({
        content: {
            title: 'Habit Tracker Reminder',
            body: "Don't forget to complete all your habits for today!",
        },
        trigger: {
            type: Notifications.SchedulableTriggerInputTypes.DAILY,
            hour: 9,
            minute: 0,
        },
    });
    return true;
};

export const cancelReminder = async (): Promise<void> => {
    await Notifications.cancelAllScheduledNotificationsAsync();
};