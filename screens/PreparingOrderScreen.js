import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import GlobalStyles from "../GlobalStyles";
import * as Animatable from "react-native-animatable";
import * as Progress from "react-native-progress";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
const PreparingOrderScreen = () => {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("Delivery");
    }, 10000);
  });
  return (
    <SafeAreaView
      style={GlobalStyles.AndroidSafeArea}
      className="bg-[#00CCBB] flex-1 justify-center items-center"
    >
      <Animatable.Image
        source={require("../assets/Position.gif")}
        animation="slideInUp"
        iterationCount={1}
        className="h-25 w-25"
      />
      <Animatable.Text
        animation="slideInUp"
        iterationCount={1}
        className="h-30 w-30 text-white my-10 font-bold text-2xl text-center px-4"
      >
        Waiting for Restaurant to accept your order
      </Animatable.Text>
      <Progress.Bar
        width={200}
        color="#fff"
        animationType="spring"
        useNativeDriver={true}
        indeterminate={true}
        progress={0.4}
      />
    </SafeAreaView>
  );
};

export default PreparingOrderScreen;
