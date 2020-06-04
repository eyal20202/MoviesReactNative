import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-community/google-signin';
import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';

export default class GoogleSignins extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            navigation: props.navigation,
            email: "myEmail@gmail.com",
            user: "Guest"
        }
    }
    render() {
        return (
            <View style={styles.mainConatinerStyle}>
                <GoogleSigninButton
                    style={{ width: 300, height: 50 }}
                    size={GoogleSigninButton.Size.Wide}
                    color={GoogleSigninButton.Color.Dark}
                    onPress={this._signIn} />
            </View>
        )
    }

    componentDidMount() {
        this.getCurrentUserInfo()
        GoogleSignin.configure({
            scopes: ['https://www.googleapis.com/auth/userinfo.email'], // what API you want to access on behalf of the user, default is email and profile
            webClientId: '669674879745-nrtepukpct1p8l0e264d89c8gubuhark.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
            offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
            forceConsentPrompt: true, // [Android] if you want to show the authorization prompt at each login.
        });

    }
    // Somewhere in your code
    _signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
            const userInfo = await GoogleSignin.signIn();
            this.setState({ userInfo });
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (e.g. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
            } else if (error.code === statusCodes.SIGN_IN_REQUIRED) {
            } else {
                // some other error happened
            }
        }
        finally {
            this.state.navigation.navigate('Home', { user: this.state.user, email: this.state.email });
        }
    };
    getCurrentUserInfo = async () => {
        try {
            const userInfo = await GoogleSignin.signInSilently();
              this.setState({ userInfo });
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_REQUIRED) {
                // user has not signed in yet
            } else{
                // some other error
            }
        }
    };

}
const styles = StyleSheet.create({
    mainConatinerStyle: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        right: 0,
    },
});

