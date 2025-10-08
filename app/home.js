import { useRouter } from 'expo-router';
import * as React from 'react';
import { Button, Image, StyleSheet, Text, View } from "react-native";

const HomeScreen = () => {
    const [isShowingImage, setShowingImage] = React.useState(false);
    const router = useRouter();
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
                        <Text>Hello, World!</Text>
                    )}
            <View style={styles.buttonContainer}>
                <Button
                    title='Profile'
                    onPress={() =>
                        router.push({
                            pathname: './profile',
                            params: { name: 'Sid'}
                        })
                    }
                    color='#841584'
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


export default HomeScreen;