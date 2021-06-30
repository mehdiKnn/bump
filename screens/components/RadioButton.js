import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions } from "react-native";
import React from "react";

export default function RadioButton({ image, isChecked, text, onRadioButtonPress }) {
  const _renderCheckedView = () => {
    return isChecked ? (
      <View style={[styles.radioButtonIconInnerIcon]} />
    ) : null;
  };
  let test = text === "design 1" ? require("../../assets/design1.png") : require("../../assets/design2.png");
  return (
    <TouchableOpacity activeOpacity={1} style={styles.mainContainer} onPress={onRadioButtonPress}>
      <View style={[styles.radioButtonTextContainer, isChecked ? styles.containerSelected:styles.container]}>
        <Text style={[styles.radioButtonText]}>{text.toUpperCase()}</Text>
        <View style={{marginTop:15, marginBottom:15, borderRadius:10}}>
          <Image style={{ height: 200, width: 120, borderRadius:10  }} source={test} />
        </View>
        <View style={[styles.radioButtonIcon]}>{_renderCheckedView()}</View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  radioButtonIcon: {
    backgroundColor: "white",
    borderWidth: 3,
    borderColor: "#DDDDDD",
    height: 30,
    width: 30,
    borderRadius: 30 / 2,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  radioButtonIconInnerIcon: {
    height: 25,
    width: 25,
    backgroundColor: "#AAAAAA",
    borderRadius: 25 / 2,
    borderWidth: 3,
    borderColor: "white",
  },
  radioButtonTextContainer: {
    alignItems:'center',
  },
  radioButtonText: {
    fontSize: 18,
    fontWeight:"bold"
  },
  containerSelected:{
    borderWidth: 2,
    borderColor: "#AAAAAA",
    height: Dimensions.get("window").height/2,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 5,
    marginRight: 5,
    justifyContent: "center",
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius:10,
    backgroundColor:"#F2F2F2",
    elevation:3
  },
  container:{
    borderWidth: 1,
    borderColor: "#DDDDDD",
    height: Dimensions.get("window").height/2,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 5,
    marginRight: 5,
    justifyContent: "center",
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius:10,
    backgroundColor:"#F5F5F5",

  }
});
