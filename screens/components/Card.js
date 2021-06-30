import { View, Text, Dimensions, TouchableOpacity, Linking } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import React from "react";

export default function Card({ card }) {

  const hexToRgb = (hex) => {
    return hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i
      , (m, r, g, b) => "#" + r + r + g + g + b + b)
      .substring(1).match(/.{2}/g)
      .map(x => parseInt(x, 16));
  };
  const textColor = (rgb) => {
    return ((rgb[0] * 0.299 + rgb[1] * 0.587 + rgb[2] * 0.114) > 186) ? "black" : "white";
  };
  const _display = ({ icon, color, content }) => {
    if (card.design === 0) {
      return (<View style={{
        flexDirection: "row",
        backgroundColor: color,
        justifyContent: "space-around",
        alignItems: "center",
        elevation: 3,
        padding: 10,
        borderRadius: 5,
        marginBottom: 20,
      }}>
        <Icon color={textColor(hexToRgb(color))} name={icon} size={35} />
        <Text style={{
          fontSize: 18, color: textColor(hexToRgb(color)),
        }}>{content[1]}</Text>
        <Icon color={textColor(hexToRgb(color))} name="long-arrow-right" size={35} />
      </View>);
    } else {
      return (<View><Text>HUHO</Text></View>);
    }
  };
  const _renderSnap = () => {
    return (<TouchableOpacity activeOpacity={1} onPress={() => Linking.openURL(card.snapchat)}><View>{_display({
      icon: "snapchat",
      color: "#FFFC01",
      content: card.snapchat.split("d/"),
    })}</View></TouchableOpacity>);
  };
  const _renderInstagram = () => {
    return (<TouchableOpacity activeOpacity={1} onPress={() => Linking.openURL(card.instagram)}><View>{_display({
      icon: "instagram",
      color: "#FA7E1E",
      content: card.instagram.split("m/"),
    })}</View></TouchableOpacity>);
  };
  const _renderFacebook = () => {
    return (<TouchableOpacity activeOpacity={1} onPress={() => Linking.openURL(card.facebook)}><View>{_display({
      icon: "facebook",
      color: "#3B5996",
      content: card.facebook.split("m/"),
    })}</View></TouchableOpacity>);
  };
  const _renderTwitter = () => {
    return (<TouchableOpacity activeOpacity={1} onPress={() => Linking.openURL(card.twitter)}><View>{_display({
      icon: "twitter",
      color: "#00acee",
      content: card.twitter.split("m/"),
    })}</View></TouchableOpacity>);
  };

  return (
    <View style={{ height: Dimensions.get("window").height / 1.7 }}>
      <Text style={{ fontSize: 40, marginBottom: 20 }}>{card.name}</Text>
      {card.snapchat !== "" ? _renderSnap() : null}
      {card.facebook !== "" ? _renderFacebook() : null}
      {card.instagram !== "" ? _renderInstagram() : null}
      {card.twitter !== "" ? _renderTwitter() : null}
    </View>
  );
}
