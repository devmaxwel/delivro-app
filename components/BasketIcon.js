import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { selectBasket, selectBasketTotal } from "../features/basketSlice";
import { useNavigation } from "@react-navigation/native";
import { numberWithCommas } from "../helpers/CommaSeparator";

const BasketIcon = () => {
  const items = useSelector(selectBasket);
  const basketTotal = useSelector(selectBasketTotal);
  const navigation = useNavigation();

  if (items.length < 1) {
    return null;
  }
  return (
    <View className="absolute bottom-10 z-50 w-full">
      <TouchableOpacity
        onPress={() => navigation.navigate("Basket")}
        className="mx-5 bg-[#00CCBB] p-4 rounded-lg flex-row items-center space-x-1"
      >
        <Text className="text-white text-lg font-extrabold py-1 px-2 bg-[#01A296] rounded-md">
          {items.length}
        </Text>
        <Text className="text-white flex-1 text-lg font-extrabold text-center">
          View Basket
        </Text>
        <Text className="text-lg text-white font-extrabold">
          KES {numberWithCommas(basketTotal)}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BasketIcon;
