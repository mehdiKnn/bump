import React from "react";
import { View, Text, Dimensions, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import Icon from "react-native-vector-icons/Ionicons";
import LottieView from "lottie-react-native";
import AntIcon from "react-native-vector-icons/AntDesign";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";

export default class Library extends React.Component {
  state = {
    activeIndex: 0,
    carouselItems: [],
  };

  constructor(props) {
    super(props);
    const subscriber = firestore()
      .collection("users")
      .doc(auth().currentUser.uid)
      .collection("contact")
      .onSnapshot(querySnapshot => {
        let items = [];
        querySnapshot.forEach(documentSnapshot => {
          items.push(documentSnapshot.data());
        });
        this.setState({ carouselItems: items });
      });
  }

  _renderItem = ({ item, index }) => {
    return (
      <View style={styles.card}>
        <Text style={{ fontSize: 30 }}>{item.title}</Text>
        <Text>{item.text}</Text>
      </View>
    );
  };

  get pagination() {
    return (
      <Pagination
        containerStyle={{ marginTop: 0 }}
        dotsLength={this.state.carouselItems.length}
        activeDotIndex={this.state.activeIndex}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 4,
          backgroundColor: "#000000",
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    );
  }

  render() {
    return (

      <SafeAreaView
        style={{
          position: "relative",
          flex: 1,
          backgroundColor: "#FFFFFF",
          paddingTop: 30,
          paddingLeft: 30,
          paddingRight: 30,
          height: Dimensions.get("window").height,
        }}>
        <View style={{ flexDirection: "column", alignItems:"center" }}>
          <View style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            marginBottom: 60,
          }}>
            <Text style={{
              color: "#708090",
              fontSize: 23,
              fontFamily: "Montserrat-SemiBold",
            }}>Vos contacts</Text>
            <TouchableOpacity onPress={() => {
              this.props.navigation.navigate("Home");
            }}>
              <Icon size={25} name={"home-outline"} />
            </TouchableOpacity>

          </View>
          <Carousel enableMomentum={true}
                    layout={"default"}
                    ref={ref => this.carousel = ref}
                    data={this.state.carouselItems}
                    sliderWidth={Dimensions.get("window").width}
                    slideStyle={{ margin: 0 }}
                    itemWidth={300}
                    renderItem={this._renderItem}
                    onSnapToItem={index => this.setState({ activeIndex: index })} />
          <View>{this.pagination}</View>
          <TouchableOpacity style={{
            backgroundColor: "white",
            borderRadius: 50,
            padding: 10,
            elevation: 6,
            justifyContent: "center",
            alignItems: "center",
          }} onPress={() => {
            this.props.navigation.navigate("Scanner");
          }}>
            <AntIcon size={30} name={"camera"}
                     backgroundColor="transparent" color="#000000" />
          </TouchableOpacity>

        </View>
        <View style={{
          position: "absolute",
          bottom: 0,
          zIndex: -1,
          width: Dimensions.get("window").width,
          height: Dimensions.get("window").height / 3,
        }}>
          <LottieView style={{ resizeMode: "cover" }}
                      source={require("../assets/lf30_editor_f2khd6fd.json")} autoPlay loop />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "stretch",
    padding: 30,
  },

  card: {
    borderRadius: 5,
    height: Dimensions.get("window").height / 1.6,
    width: "100%",
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: "#000000",
    elevation: 3,
  },

  addIcon: {
    alignSelf: "center",
  },
});
