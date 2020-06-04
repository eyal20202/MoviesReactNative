import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  Button,
} from 'react-native';
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

export const ConnectButtons = () => {
  return (
    <View style={styles.mainConatinerStyle}>
      <Button title="Facebook" >Hello from </Button>
      <Button title="Google" color="red">Hello from </Button>
    </View>
  );
};
const styles = StyleSheet.create({
  mainConatinerStyle: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    right: 0,
    bottom: -50,
  },
});
export default ConnectButtons;
