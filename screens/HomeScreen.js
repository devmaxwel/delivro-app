import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  ChevronDownIcon,
  UserIcon,
  AdjustmentsIcon,
  SearchIcon,
} from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import Catogories from "../components/Catogories";
import FeaturedRow from "../components/FeaturedRow";
import client from "../sanity";
import GlobalStyles from "../GlobalStyles";

const HomeScreen = () => {
  const navigation = useNavigation();

  const [featuredCategory, setFeaturedCategory] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    client
      .fetch(
        `*[_type =="featured"]{
  ...,
  restaurants[] =>{
    ...,
  }
}`
      )
      .then((data) => {
        setFeaturedCategory(data);
      });
  }, []);

  return (
    <SafeAreaView
      className="pt-10 bg-white"
      style={GlobalStyles.AndroidSafeArea}
    >
      {/* Header */}
      <View className="flex-row items-center pb-3 mx-4 space-x-2">
        <Image
          source={{
            uri: "https://links.papareact.com/wru",
          }}
          className="w-10 h-10 bg-gray-200 rounded-full p-4"
        />
        <View style={{ flex: 1 }}>
          <Text className="font-bold text-gray-400 text-xs">Deliver Now</Text>
          <Text className="font-bold text-xl">
            Current Location
            <ChevronDownIcon size={20} color="#00CCBB" />
          </Text>
        </View>
        <UserIcon size={35} color="#00CCBB" />
      </View>
      {/* Search  */}
      <View className="flex-row items-center space-x-2 pb-3 px-2">
        <View className="flex-row space-x-2 flex-1 bg-gray-200 p-3 mx-2 rounded-full">
          <SearchIcon color="gray" className="w-7 h-7" />
          <TextInput
            placeholder="Restaurants and Cuisines"
            keyboardType="default"
            className="text-black"
          />
        </View>
        <AdjustmentsIcon color="#00CCBB" size={35} />
      </View>
      <ScrollView
        className="bg-gray-100"
        contentContainerStyle={{
          paddingBottom: 2,
        }}
      >
        {/* Scrollable Container */}
        {/* Categories */}
        <Catogories />
        {/* Featured Rows */}
        {featuredCategory?.map((category) => {
          return (
            <FeaturedRow
              key={category._id}
              id={category._id}
              title={category.name}
              description={category.shortdescription}
            />
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
