import { useLocalSearchParams, useRouter } from 'expo-router';
import * as React from 'react';
import { Button, Image, StyleSheet, Text, View } from "react-native";
import { useTheme } from '../context/themeContext';

const ProfileScreen = () => {
    const { name } = useLocalSearchParams();
    const route = useRouter();
    const { colours } = useTheme();
    const [isShowingImage, setShowingImage] = React.useState(false);

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