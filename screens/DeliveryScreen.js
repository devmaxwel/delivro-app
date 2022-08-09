import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import GlobalStyles from "../GlobalStyles";
import { XIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectRestaurant } from "../features/restaurantSlice";
import * as Progress from "react-native-progress";
import MapView, { Marker } from "react-native-maps";

const DeliveryScreen = () => {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);
  console.log(restaurant.lat, restaurant.long);
  return (
    <View className="bg-[#00CCBB] flex-1">
      <SafeAreaView style={GlobalStyles.AndroidSafeArea}>
        <View className="flex-row justify-between p-5 items-center">
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <XIcon color="#fff" size={30} />
          </TouchableOpacity>
          <Text className="font-light text-lg text-white">Order Help</Text>
        </View>
        <View className="mx-5 bg-white p-5 shadow-lg z-50 rounded-md my-2">
          <View className="flex-row justify-between">
            <View>
              <Text className="text-gray-400 text-lg">Estimated Arrival</Text>
              <Text className="text-4xl">40-55 Minutes</Text>
            </View>
            <Image
              source={{
                uri: "https://links.papareact.com/fls",
              }}
              className="h-20 w-20"
            />
          </View>
          <Progress.Bar
            width={200}
            color="#00CCBB"
            animationType="spring"
            useNativeDriver={true}
            indeterminate={true}
            progress={0.4}
          />
          <Text className="mt-3 text-gray-400">
            Your Order is being prepared at {restaurant.title}
          </Text>
        </View>
      </SafeAreaView>
      <MapView
        initialRegion={{
          latitude: restaurant.lat,
          longitude: restaurant.long,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        className="flex-1 -mt-80 z-0"
        mapType="mutedStandard"
      >
        <Marker
          coordinate={{
            latitude: restaurant.lat,
            longitude: restaurant.long,
          }}
          title={restaurant.title}
          description={restaurant.short_description}
          identifier="origin"
          pinColor="#00CCBB"
        />
      </MapView>
      <SafeAreaView
        // style={GlobalStyles.AndroidSafeArea}
        className="bg-white flex-row items-center h-28 space-x-5 px-4"
      >
        <Image
          source={{
            uri: "https://links.papareact.com/wru",
          }}
          className="h-12 w-12 p-4 rounded-full bg-gray-400"
        />
        <View className="flex-1">
          <Text className="text-lg">Your Rider</Text>
          <Text className="text-gray-400">Ferdinand Omondi</Text>
        </View>
        <Text className="text-[#00CCBB] mr-5 text-lg font-bold">Call</Text>
      </SafeAreaView>
    </View>
  );
};

export default DeliveryScreen;
