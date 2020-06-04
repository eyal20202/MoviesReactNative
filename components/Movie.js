import React from 'react'
import { View, Image, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Favor from './Favor';


export const Movie = (props) => {
    const { poster_path, title, overview, vote_average } = props.item
    function openMoviePage(props) {
        props.navigation.navigate('Movie', { item: props.item, user: props.user, mUser: props.mUser })
    }
    return (

        <View>
            <TouchableOpacity onPress={() => openMoviePage(props)}>
                <View style={{
                    flex: 1, flexDirection: 'row', borderBottomColor: 'black',
                    borderBottomWidth: 1, padding: 5
                }}>
                    <Image
                        style={{ width: 50, height: 50, marginRight: 5 }}
                        source={{ uri: 'https://image.tmdb.org/t/p/w185_and_h278_bestv2' + poster_path }}
                    />
                    <Text style={styles.title}>Title - {title} &nbsp; |  &nbsp;
      Votes: <Text style={styles.vote}>  {vote_average}</Text>
                        {"\n"}
                        <Text style={styles.text}>{overview.substring(0, 100).replace(/\w+$/, '')}...</Text>
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontWeight: 'bold',
        flexShrink: 1
    },
    text: {
        fontWeight: 'normal'
    },
    vote: {
        color: 'brown'
    }
})

export default Movie;

