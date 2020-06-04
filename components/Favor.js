import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
} from 'react-native';
import Movies, { helloM } from './Movies';
import Movie from './Movie';
export default class Favor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            mUser: {
                email: props.user,
                numFav: 0,
                ids: []
            },
            email: props.user
        }
        this.hello = this.hello.bind(this);
        this.addUser = this.addUser.bind(this);
        this.addMovie = this.addMovie.bind(this);
        this.removeMovie = this.removeMovie.bind(this);
    }
    render() {

        return (
            <View >
                <Text>Size my favorites list is : {this.state.mUser.numFav}</Text>
            </View>
        );
    }
};