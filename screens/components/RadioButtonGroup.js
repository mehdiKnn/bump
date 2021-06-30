import React, { useState } from "react";
import { View } from "react-native";
import RadioButton from "./RadioButton";

export default function RadioButtonGroup({ values, onPress, type }) {
  const [currentSelectedItem, setCurrentSelectedItem] = useState(0);

  const _onPress = (idx) => {
    onPress(idx, type);
    setCurrentSelectedItem(idx);
  };

  const _renderRadioButtons = () => {
    return (values || []).map((listItem, idx) => {
      let isChecked = currentSelectedItem === idx;
      return (
        <RadioButton
          type={type}
          key={idx}
          onRadioButtonPress={() => _onPress(idx , listItem.type)}
          isChecked={isChecked}
          text={listItem.text}
          image={listItem.image}
        />
      );
    });
  };
  return <View style={{flexDirection:"row"}}>{_renderRadioButtons()}</View>;
}
