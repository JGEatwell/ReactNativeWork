import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams, useRouter } from 'expo-router';
import * as React from 'react';
import { Button, Image, StyleSheet, Switch, Text, View } from "react-native";
import { REMINDER_STORAGE_KEY } from '../constants/storage';
import { useTheme } from '../context/themeContext';
import { cancelReminder, scheduleReminder } from '../utils/notifications';

const ProfileScreen = () => {
    const { name } = useLocalSearchParams();
    const route = useRouter();
    const { colours } = useTheme();
    const [isShowingImage, setShowingImage] = React.useState(false);
    const [reminderEnabled, setReminderEnabled] = React.useState(false);

    React.useEffect(() => {
        const loadReminderSetting = async () => {
            const stored = await AsyncStorage.getItem(REMINDER_STORAGE_KEY);
            setReminderEnabled(stored === 'true');
        };
        loadReminderSetting();
    }, []);

    const handleToggleReminder = async (value) => {
        if (value) {
            const success = await scheduleReminder();
            if (!success) return;
        } else {
            await cancelReminder();
        }
        setReminderEnabled(value);
        await AsyncStorage.setItem(REMINDER_STORAGE_KEY, value ? 'true' : 'false');
    };
    

    const styles = React.useMemo(() => StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colours.background,
    },
    text: {
        color: colours.text,
    },
    buttonContainer: {
        margin: 20,
        marginBottom: 40,
        alignSelf: 'stretch'
    },
    alternativeLayoutButtonContainer: {
        margin: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    reminderRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 24,
        paddingHorizontal: 24,
        alignSelf: 'stretch',
    },
}), [colours]);

    return (
        <View style={styles.container}>
            {
                isShowingImage ?
                    (
                        <Image
                            source={{
                                uri: 'https://reactnative.dev/img/tiny_logo.png'
                            }}
                            style={{ width: 50, height: 50 }}
                        />
                    ) : (
                        <Text style={styles.text}>This is {name}'s profile</Text>
                    )}
            <View style={styles.reminderRow}>
                <Text style={styles.text}>Daily Reminder</Text>
                <Switch
                    value={reminderEnabled}
                    onValueChange={handleToggleReminder}
                    trackColor={{ true: colours.primary }}
                />
            </View>
            <View style={styles.buttonContainer}>
                <Button
                    title="Press me"
                    onPress={() =>
                        route.push({ 
                            pathname: './home',
                        })
                    }
                    color={colours.primary}
                />
            </View>
        </View>
    );
}




export default ProfileScreen;