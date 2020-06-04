import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  Button
} from 'react-native';
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { ConnectButtons } from './ConnectButtons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ScreenMovie from './ScreenMovie';
import GoogleSignins from './GoogleSignIns';
export const Login = ({ navigation }) => {
  return (
    <View style={styles.myView}>
      
      <Text style={styles.title}>Welcome User!</Text>
      
      <Image
        source={{ uri: 'https://ya-webdesign.com/images250_/avatar-png-1.png' }}
        style={styles.image}
      />
       
      <Text style={styles.welcome}>
        Please Login to continue to the awesomeness :)
            </Text>
        <GoogleSignins navigation={navigation} />
    </View>
  );
};
const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontSize: 35,
    marginBottom: 10,
  },
  image: {
    width: 200,
    height: 200,
    marginLeft: 'auto',
    marginRight: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  welcome: {
    textAlign: 'center',
    marginTop: 10,
    // bottom: 0
  },
  myView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

});
export default Login;
