import React from 'react'
import { Modal, View, Image, Text, StyleSheet, FlatList, Button, Icon, AsyncStorage, Alert, ListView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export default class ScreenMovie extends React.Component {
    constructor(props) {
        super(props);
        let findM = !this.props.route.params.mUser.ids.includes(this.props.route.params.item.id)
        let temp = findM ? 'Add to My Favorites' : 'Remvoe Frome My Favorites';
        let numFav = this.props.route.params.mUser.ids.length
        this.state = {
            isFav: findM,
            textBtn: temp,
            mUser: this.props.route.params.mUser,
            user: this.props.route.params.user,
            m_id: this.props.route.params.item.id,
            numFav: numFav,
            modalVisible: false,
            ids: this.props.route.params.mUser.ids
        }
    }
    componentDidMount() {
    }
    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    onPress = () => {
        if (this.state.isFav) {
            this.addMovie(this.state.m_id)
        }
        else {
            this.removeMovie(this.state.m_id)
        }
        this.setState({
            textBtn: !this.state.isFav ? 'Add to My Favorites' : 'Remvoe Frome My Favorites',
            isFav: !this.state.isFav
        })
    }
    addMovie = (id) => {
        let ids = this.state.mUser.ids;
        let email = this.state.email;
        var movies = {
        };
        let name = this.props.route.params.item.title
        if (this.props.route.params.mUser.movie != null) {
            movies = this.props.route.params.mUser.movie;
        }
        else {
            moveis = {}
        }
        if (!ids.includes(id)) {
            ids.push(id)
            movies[id] = name;

            let a = {
                ids: ids,
                numFav: this.state.mUser.ids.length,
                movie: movies
            }
            AsyncStorage.mergeItem(email, JSON.stringify(a), () => {
                console.log('email', a)
                AsyncStorage.getItem(email, (err, result) => {
                    console.log('result', result)
                });
            });
            this.setState({
                numFav: this.state.numFav + 1

            })
        }
    }
    removeMovie = (id) => {
        let ids = this.state.mUser.ids;
        let email = this.state.email
        let movies = this.props.route.params.mUser.movie;
        if (ids.includes(id)) {
            const index = ids.indexOf(id);
            delete movies[id];
            if (index > -1) {
                ids.splice(index, id);
            }
            let a = {
                ids: ids,
                numFav: this.state.mUser.ids.length,
                moveis: movies
            }
            AsyncStorage.mergeItem(email, JSON.stringify(a), () => {
                AsyncStorage.getItem(email, (err, result) => {
                });
            });
            this.setState({
                numFav: this.state.numFav - 1
            })

        }
    }
    showItem = (ids, index) => {
        console.log(ids)
        return (
            <View style={{ borderBottomColor: "black", borderBottomWidth: 1, padding: 5 }}>
                <Text style={{ fontSize: 20 }}>{index + 1}. {this.state.mUser.movie[ids]}</Text>
            </View>
        )
    }
    render() {
        const { poster_path, title, overview, vote_average } = this.props.route.params.item
        const ids = this.state.ids
        return (

            <View>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        this.setModalVisible(!this.state.modalVisible);
                    }}
                    style={{justifyContent: 'center',
                    alignItems: 'center',
                    margin:0}}>
                    <View style={{ marginTop: 22}}>
                        <View style={{ padding: 10 }}>
                            <Text style={{ textAlign: "center", fontSize: 20 }}>My favorites list</Text>
                            <FlatList
                                data={this.state.ids}
                                renderItem={({ item, index }) => this.showItem(item, index)}
                                keyExtractor={({ id }, index) => id}
                                style={{ margin: 5 }} />
                            <Button
                                onPress={() => {
                                    this.setModalVisible(!this.state.modalVisible);
                                }} title="close"
                            />
                        </View>
                    </View>
                </Modal>
                <ScrollView>
                    <View style={{ flexDirection: 'row', margin: 5}}>
                        <Text style={styles.listFav}>Size of my favorites list is : {this.state.numFav}</Text>
                            <Button onPress={() => {
                                this.setModalVisible(true);
                            }}
                                title="View" />
                        </View>
                    <View style={{
                        flexDirection: 'row', padding: 5
                    }}>
                        <Image
                            style={{ width: 185, height: 278, marginRight: 5 }}
                            source={{ uri: 'https://image.tmdb.org/t/p/w185_and_h278_bestv2' + poster_path }}
                        />

                        <Text style={styles.title}>Title - {title} &nbsp; |
                    {"\n"}
                            &nbsp;
      Votes: <Text style={styles.vote}>  {vote_average}</Text>

                        </Text>

                    </View>
                    <View style={{
                        width: 200
                    }}>

                        <Button title={this.state.textBtn} color="orange" onPress={this.onPress} />

                    </View>
                    <Text style={styles.text}>{overview}</Text>
                </ScrollView>
            </View>

        );
    }
};

const styles = StyleSheet.create({
    title: {
        fontWeight: 'bold',
        fontSize: 30,
        flexShrink: 1
    },
    text: {
        fontWeight: 'normal',
        fontSize: 25,
        padding: 5
    },
    vote: {
        color: 'brown'
        ,
    },
    listFav: {
        fontSize: 25,
        paddingHorizontal: 15
    },

})