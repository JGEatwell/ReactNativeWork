import * as React from 'react';
import { Text, View, Button, Image, StyleSheet } from "react-native";
import {createStaticNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';


const Index = () => {
  const[isShowingImage, setShowingImage] = React.useState(false);
   return(
  <View style={styles.container}>
      {
        isShowingImage ?
        (
          <Image
            source={{
              uri: 'https://reactnative.dev/img/tiny_logo.png'}}
              style={{width: 50, height: 50}}
            />
        ) : (
    <Text>Hello, World!</Text>
        )}
  <View style={styles.buttonContainer}>
    <Button
      onPress={() => setShowingImage(true)}
      title="Press me"
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

export default Index;