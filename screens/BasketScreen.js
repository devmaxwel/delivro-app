import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectRestaurant } from "../features/restaurantSlice";
import {
  clearBasket,
  removeFromBasket,
  selectBasket,
  selectBasketTotal,
} from "../features/basketSlice";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { useMemo } from "react";
import GlobalStyles from "../GlobalStyles";
import { XCircleIcon } from "react-native-heroicons/solid";
import { urlFor } from "../sanity";
import { ScrollView } from "react-native";
import { numberWithCommas } from "../helpers/CommaSeparator";

const BasketScreen = () => {
  const Restaurant = useSelector(selectRestaurant);
  const items = useSelector(selectBasket);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const basketTotal = useSelector(selectBasketTotal);
  const [groupedItemsBasket, setgroupedItemsBasket] = useState([]);

  const deliveryFee = (5 / 100) * basketTotal;
  useMemo(() => {
    const groupedItems = items.reduce((results, item) => {
      (results[item.id] = results[item.id] || []).push(item);
      return results;
    }, {});
    setgroupedItemsBasket(groupedItems);
  }, [items]);

  return (
    <SafeAreaView
      style={GlobalStyles.AndroidSafeArea}
      className="bg-white flex-1"
    >
      <View className="flex-1 bg-gray-100">
        <View className="p-5 border-b border-[#00CCBB] bg-white shadow-xs">
          <View>
            <Text className="text-lg font-bold text-center">Basket</Text>
            <Text className="text-center text-gray-400">
              {Restaurant.title}
            </Text>
          </View>
          <TouchableOpacity
            className="rounded-full bg-gray-100 absolute top-3 right-3"
            onPress={navigation.goBack}
          >
            <XCircleIcon color="#00CCBB" height={50} width={50} />
          </TouchableOpacity>
        </View>
        <View className="flex-row items-center px-4 space-x-4 my-5 bg-white py-3">
          <Image
            source={{
              uri: "https://links.papareact.com/wru",
            }}
            className="w-7 h-7 rounded-full bg-gray-300 p-4"
          />
          <Text className="flex-1">Delivery in 20-30 Minutes</Text>
          <TouchableOpacity onPress={() => dispatch(clearBasket())}>
            <Text className="text-[#00CCBB]">Clear Cart</Text>
          </TouchableOpacity>
        </View>
        <ScrollView className="divide-y divide-gray-200">
          {Object.entries(groupedItemsBasket).map(([key, items]) => (
            <View
              key={key}
              className="flex-row items-center space-x-3  bg-white py-2 px-5"
            >
              <Text className="text-[#00CCBB] text-lg">{items.length} x</Text>
              <Image
                source={{
                  uri: urlFor(items[0]?.image).url(),
                }}
                className="h-12 w-12 rounded-md"
              />
              <Text className="flex-1">{items[0]?.name}</Text>
              <Text className="text-gray-600">
                KES {numberWithCommas(items[0].price)}
              </Text>
              <TouchableOpacity>
                <Text
                  onPress={() => dispatch(removeFromBasket({ id: key }))}
                  className="text-[#00CCBB] text-xs"
                >
                  Remove
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
        <View className="p-5 bg-white mt-5 space-y-4">
          <View className="flex-row justify-between">
            <Text className="text-gray-400">Subtotal</Text>
            <Text className="text-gray-400">
              KES {numberWithCommas(basketTotal)}
            </Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-gray-400">Delivery Fee</Text>
            <Text className="text-gray-400">
              KES {numberWithCommas(deliveryFee)}
            </Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-md">Order Total</Text>
            <Text className="font-extrabold">
              KES {numberWithCommas((basketTotal + deliveryFee).toFixed(0))}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate("PreparingOrder")}
            className="bg-[#00CCBB] rounded-lg p-4"
          >
            <Text className="text-center text-lg text-white font-extrabold">
              Place Order
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default BasketScreen;
