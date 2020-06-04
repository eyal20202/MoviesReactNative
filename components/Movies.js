import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  Button,
  FlatList,
  ListView,
  AsyncStorage,
} from 'react-native';
import Movie from './Movie';
export default class Movies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      mUser: {
        email: this.props.route.params.email,
        numFav: 0,
        ids: [],
        movie: {

        },
      },
      user: this.props.route.params.user
    }

  }
  addUser = () => {
    let email = this.state.user
    let mUser = {
      email: email,
      numFav: 0,
      ids: [],
      movie: {

      },
    }
    AsyncStorage.getItem(email, (err, result) => {
      var value = JSON.parse(result);
      if (value != null) {
        this.state.mUser = value
      } else {
        AsyncStorage.setItem(email, JSON.stringify(mUser), () => {
        });
      }
    });
  }
  componentDidMount() {
    return fetch('https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=af18322593caa326be78ec10d94e869e')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataSource: responseJson.results,
        }, function () {

        });

      })
      .catch((error) => {
        console.error(error);
      });
  }
  render() {
    this.addUser(this.bind);
    return (
      <View>
        <Text style={styles.txtHello}>Hello {this.state.user} !</Text>
        <FlatList
          data={this.state.dataSource}
          renderItem={({ item }) => <Movie item={item} user={this.state.user} mUser={this.state.mUser} navigation={this.props.navigation} />}
          keyExtractor={({ id }, index) => id}
        />
      </View>
    );
  }
};
const styles = StyleSheet.create({
  mainConatinerStyle: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    right: 0,
    bottom: -50,
  },
  txtHello: {
    fontSize: 20,
    textAlign: "center",
    letterSpacing: 2,
    paddingVertical: 10,
  }
});
