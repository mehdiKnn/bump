import React from "react";
import QRCodeScanner from "react-native-qrcode-scanner";
import { RNCamera } from "react-native-camera";
import { StyleSheet, Text, TouchableOpacity, View, Dimensions } from "react-native";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import LottieView from "lottie-react-native";

export default class Scanner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  onSuccess = e => {
    this.setState({ loading: true }, () => {
      let data = JSON.parse(e.data);
      firestore()
        .collection("users").doc(auth().currentUser.uid).collection("contact")
        .add(data.item)
        .then(() => {
          setTimeout(() => {
            this.props.navigation.navigate("Library");
          }, 2000);
        });
    });
  };

  render() {
    return (
      <View style={{ height: Dimensions.get("window").height }}>
        {this.state.loading ?
          <LottieView source={require("../assets/5427-scan-qr-code.json")} autoPlay loop /> : <View>
            <Text style={{
              backgroundColor: "transparent", position: "absolute",
              marginTop: 20,
              marginLeft: 20,
              marginRight: 20,
              top: 50,
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 1,
              fontSize: 20,
              textAlign: "center",
              color: "#FFFFFF",
              lineHeight: 30,
            }}>Scannez un code pour ajouter un contact</Text>
            <QRCodeScanner
              showMarker={true}
              fadeIn={true}
              onRead={this.onSuccess}
              flashMode={RNCamera.Constants.FlashMode.auto}
              topContent={
                <Text style={styles.zeroContainer}>
                </Text>
              }
              cameraStyle={styles.cameraContainer}
              bottomContent={
                <TouchableOpacity style={styles.zeroContainer}>
                </TouchableOpacity>
              }
            /></View>}
      </View>

    );
  }
}


const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: "#777",
  },
  textBold: {
    fontWeight: "500",
    color: "#000",
  },
  buttonText: {
    fontSize: 21,
    color: "rgb(0,122,255)",
  },
  buttonTouchable: {
    padding: 16,
  },
  zeroContainer: {
    height: 0,
    flex: 0,
  },
  cameraContainer: {
    height: Dimensions.get("window").height,
  },
});
