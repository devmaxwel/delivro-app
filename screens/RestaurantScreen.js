import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { urlFor } from "../sanity";
import {
  ArrowLeftIcon,
  ChevronRightIcon,
  LocationMarkerIcon,
  QuestionMarkCircleIcon,
} from "react-native-heroicons/outline";
import { StarIcon } from "react-native-heroicons/solid";
import DishRow from "../components/DishRow";
import BasketIcon from "../components/BasketIcon";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setRestaurant } from "../features/restaurantSlice";
import { selectBasket } from "../features/basketSlice";

const RestaurantScreen = () => {
  const navigation = useNavigation();
  const {
    params: {
      id,
      imgUrl,
      title,
      rating,
      genre,
      address,
      short_description,
      dishes,
      long,
      lat,
    },
  } = useRoute();
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  useEffect(() => {
    dispatch(
      setRestaurant({
        id,
        imgUrl,
        title,
        rating,
        genre,
        address,
        short_description,
        dishes,
        long,
        lat,
      })
    );
  }, [dispatch]);
  const items = useSelector(selectBasket);
  return (
    <>
      <BasketIcon />
      <ScrollView>
        <View className="relative">
          <Image
            source={{
              uri: urlFor(imgUrl).url(),
            }}
            className="w-full h-56 bg-gray-300 p-2 object-contain"
          />
          <TouchableOpacity
            onPress={() => {
              return navigation.navigate("Home");
            }}
            className="absolute p-2 top-14 left-5 bg-gray-100 rounded-full"
          >
            <ArrowLeftIcon color="#00CCBB" size={25} />
          </TouchableOpacity>
        </View>
        <View className="bg-white">
          <View className="px-4 pt-2">
            <Text className="font-bold text-3xl">{title}</Text>
            <View className="flex-row space-x-2 my-1">
              <View className="flex-row items-center space-x-1">
                <StarIcon color="green" opacity={0.5} size={20} />
                <Text className="text-xs text-gray-500">
                  <Text className=" text-green-500">{rating}</Text>. {genre}
                </Text>
              </View>
              <View className="flex-row items-center space-x-1">
                <LocationMarkerIcon color="gray" opacity={0.4} size={20} />
                <Text className="text-xs text-gray-500">
                  {" "}
                  Nearby .<Text className=" text-gray-500"> {address}</Text>
                </Text>
              </View>
            </View>
            <Text className="text-gray-500 pb-4 mt-2">{short_description}</Text>
          </View>
          <TouchableOpacity className="flex-row items-center pb-4 px-4 space-x-2 border-y p-4 border-gray-500">
            <QuestionMarkCircleIcon color="gray" />
            <Text className="pl-2 flex-1 font-bold text-md">
              Have a food allergy
            </Text>
            <ChevronRightIcon color="#00CCBB" size={25} />
          </TouchableOpacity>
        </View>
        <View className={items.length > 0 ? "pb-36" : ""}>
          <Text className="px-4 pt-6 text-lg font-bold mb-3">Menu</Text>
          {dishes?.map((dish) => {
            return (
              <DishRow
                key={dish._id}
                id={dish._id}
                name={dish.name}
                description={dish.shortdescription}
                price={dish.price}
                image={dish.image}
              />
            );
          })}
        </View>
      </ScrollView>
    </>
  );
};

export default RestaurantScreen;
