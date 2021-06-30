import React, { Component } from "react";
import auth from "@react-native-firebase/auth";
import { Button, View, Text, StyleSheet, TextInput } from "react-native";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

export default class CustomAuth extends Component {
  constructor(props) {
    super(props);

    GoogleSignin.configure({
        webClientId: "387687061582-384i2pcvtcrc5ueub520fsiq7gt3uih0.apps.googleusercontent.com",
      },
    );

    this.state = {
      mail: "",
      password: "",
    };
  }

  onLoginButtonPress = () => {
    const { mail, password } = this.state;
    auth().signInWithEmailAndPassword(mail, password).then(() => {

    });
  };

  onGoogleButtonPress = async () => {
    const { idToken } = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    return auth().signInWithCredential(googleCredential);
  };

  onLogOutButtonPress = () => {
    auth()
      .signOut()
      .then(() => console.log("User signed out!"));
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.inputext}>Sample Login Form</Text>
        <TextInput
          value={this.state.mail}
          onChangeText={(mail) => this.setState({ mail })}
          label="Email"
          style={styles.input}
        />
        <TextInput
          value={this.state.password}
          onChangeText={(password) => this.setState({ password })}
          label="Password"
          secureTextEntry={true}
          style={styles.input}
        />

        <Button
          title={"Login"}
          style={styles.input}
          onPress={this.onLoginButtonPress}
        />
        <Button
          title={"Google"}
          style={styles.input}
          onPress={this.onGoogleButtonPress}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#00FFFF",
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 10,
  },
  inputext: {
    width: 200,
    height: 44,
    padding: 10,
    textAlign: "center",
    fontWeight: "bold",
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 10,
  },
});

