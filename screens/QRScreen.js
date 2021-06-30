import React, { Component } from "react";
import QRCode from "react-native-qrcode-svg";
import {
  StyleSheet,
  View,
  TextInput,
} from "react-native";

export default class QRScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: this.props.route.params,
    };
  }

  /*  state = {
      text: "https://medium.com/@mushtaque87",
    };*/

  render() {

    return (
      <View style={styles.container}>
        <QRCode
          value={JSON.stringify(this.state.item)}
          size={200}
          bgColor="#000000"
          fgColor="#FFFFFF" />
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },

  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    margin: 10,
    borderRadius: 5,
    padding: 5,
  },
});
