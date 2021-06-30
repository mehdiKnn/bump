import React from "react";
import { Dimensions, SafeAreaView, Text, TextInput, View, StyleSheet, Image } from "react-native";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { ProgressStep, ProgressSteps } from "react-native-progress-steps";
import RadioButtonGroup from "./components/RadioButtonGroup";
import LottieView from "lottie-react-native";
import { ColorPicker, fromHsv } from "react-native-color-picker";
import Slider from "@react-native-community/slider";
import { Input } from "react-native-elements";


export default class CreateCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      selectedIndex: 0,
      card: {
        design: 0,
        color: "#122B44",
        name: "",
        snapchat: "",
        instagram: "",
        facebook: "",
        twitter: "",
      },
    };

  }

  data = {
    design: [{
      text: "design 1",
    },
      {
        text: "design 2",
      }],
  };

  onRadioButtonPress = (itemIdx, type) => {
    this.setState({ card: { ...this.state.card, [type]: itemIdx } });
  };
  handleName = (value) => {
    this.setState({ card: { ...this.state.card, name: value } });
  };
  handleSnapchat = (value) => {
    let link = "https://www.snapchat.com/add/" + value;
    this.setState({ card: { ...this.state.card, snapchat: link } });
  };
  handleInstagram = (value) => {
    let link = "https://instagram.com/" + value;
    this.setState({ card: { ...this.state.card, instagram: link } });
  };
  handleFacebook = (value) => {
    let link = "https://facebook.com/" + value;
    this.setState({ card: { ...this.state.card, facebook: link } });
  };
  handleTwitter = (value) => {
    let link = "https://twitter.com/" + value;
    this.setState({ card: { ...this.state.card, twitter: link } });
  };

  saveData = () => {
    this.setState({ loading: true }, () => {
      firestore()
        .collection("users")
        .doc(auth().currentUser.uid)
        .collection("cards")
        .doc()
        .set({
          card: this.state.card,
        }).then(() => {
        setTimeout(() => {
          this.props.navigation.navigate("Home");
        }, 500);

      });
    });
  };

  render() {
    return (
      <SafeAreaView style={{
        position: "relative",
        flex: 1,
        backgroundColor: "#FFFFFF",
        paddingTop: 30,
        paddingLeft: 30,
        paddingRight: 30,
        height: Dimensions.get("window").height,
        width: Dimensions.get("window").width,
      }}>
        <View>
          <Text style={{
            color: "#708090",
            fontSize: 23,
            fontFamily: "Montserrat-SemiBold",
          }}>
            Création
          </Text>
        </View>
        {this.state.loading ? <LottieView
            source={require("../assets/4964-check-mark-success-animation.json")} autoPlay loop /> :
          <View style={{ flex: 1 }}>
            <ProgressSteps>
              <ProgressStep nextBtnText={"Suivant"} label="Template">
                <View style={{ alignItems: "center", justifyContent: "center" }}>
                  <RadioButtonGroup type={"design"} values={this.data.design} onPress={this.onRadioButtonPress} />
                </View>
              </ProgressStep>
              <ProgressStep label="Couleur">
                <View style={{ alignItems: "center" }}>
                  <ColorPicker sliderComponent={Slider} defaultColor={"#122B44"}
                               onColorChange={color => this.setState({
                                 card: {
                                   ...this.state.card,
                                   color: fromHsv(color),
                                 },
                               })}
                               style={{ flex: 1, height: 300, width: 300 }}
                  />
                </View>
              </ProgressStep>
              <ProgressStep label="Données">
                <View style={{ alignItems: "center" }}>
                  <Input onSubmitEditing={() => {
                    this.secondTextInput.focus();
                  }} returnKeyType={"next"} label={"Snapchat"} onChangeText={this.handleSnapchat}
                         placeholder="Snapchat username"
                         leftIcon={{ type: "font-awesome", name: "snapchat-square" }} blurOnSubmit={false} />
                  <Input returnKeyType={"next"} blurOnSubmit={false} onSubmitEditing={() => {
                    this.thirdTextInput.focus();
                  }}
                         ref={(input) => {
                           this.secondTextInput = input;
                         }} label={"Facebook"} onChangeText={this.handleFacebook}
                         placeholder="Facebook username"
                         leftIcon={{ type: "font-awesome", name: "facebook-square" }} />
                  <Input returnKeyType={"next"} blurOnSubmit={false} onSubmitEditing={() => {
                    this.fourthTextInput.focus();
                  }} ref={(input) => {
                    this.thirdTextInput = input;
                  }} label={"Twitter"} onChangeText={this.handleTwitter}
                         placeholder="Twitter username"
                         leftIcon={{ type: "font-awesome", name: "twitter-square" }} />
                  <Input returnKeyType={"next"}
                         ref={(input) => {
                           this.fourthTextInput = input;
                         }}
                         label={"Instagram"} onChangeText={this.handleInstagram}
                         placeholder="Instagram username"
                         leftIcon={{ type: "font-awesome", name: "instagram" }} />
                </View>
              </ProgressStep>
              <ProgressStep onSubmit={this.saveData} label="Nom">
                <View style={{ alignItems: "center" }}>
                  <Text>Et pour finir un nom ! </Text>
                  <Input onChangeText={this.handleName}
                         placeholder="Votre carte"
                  />
                </View>
              </ProgressStep>
            </ProgressSteps>
          </View>}
      </SafeAreaView>
    );
  }

}

