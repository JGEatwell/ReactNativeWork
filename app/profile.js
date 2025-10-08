import { useLocalSearchParams, useRouter } from 'expo-router';
import * as React from 'react';
import { Button, Image, StyleSheet, Text, View } from "react-native";

const ProfileScreen = () => {
    const { name } = useLocalSearchParams();
    const route = useRouter();
    const [isShowingImage, setShowingImage] = React.useState(false);
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
                        <Text>This is {name}'s profile</Text>
                    )}
            <View style={styles.buttonContainer}>
                <Button
                    title="Press me"
                    onPress={() =>
                        route.push({ 
                            pathname: './home',
                        })
                    }
                    color="#841584"
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center'
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
});


export default ProfileScreen;