import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { numberWithCommas } from "../helpers/CommaSeparator";
import { urlFor } from "../sanity";
import { MinusCircleIcon, PlusCircleIcon } from "react-native-heroicons/solid";
import { useDispatch, useSelector } from "react-redux";
import {
  addToBasket,
  removeFromBasket,
  selectBasket,
  selectBasketWithId,
} from "../features/basketSlice";

const DishRow = ({ id, name, image, price, description }) => {
  const [isPressed, setIsPressed] = useState(false);
  const items = useSelector((state) => selectBasketWithId(state, id));
  const dispatch = useDispatch();

  const addItemToBasket = () => {
    dispatch(addToBasket({ id, name, image, price, description }));
  };
  const removeItemfromBasket = () => {
    if (!items.length > 0) {
      return;
    }
    dispatch(removeFromBasket({ id }));
  };
  return (
    <>
      <TouchableOpacity
        onPress={() => setIsPressed(!isPressed)}
        className={`p-4 bg-white border border-gray-200 ${
          isPressed && "border-b-0"
        }`}
      >
        <View className="flex-row">
          <View className="flex-1 pr-2">
            <View>
              <Text className="text-lg mb-1 font-bold">{name}</Text>
              <Text className="text-gray-400">{description}</Text>
              <Text>Ksh {numberWithCommas(price)}</Text>
            </View>
          </View>
          <View>
            <Image
              style={{
                borderWidth: 1,
                borderColor: "#F3F3F4",
              }}
              source={{
                uri: urlFor(image).url(),
              }}
              className="h-20 w-20 p-4 rounded-md bg-gray-300"
            />
          </View>
        </View>
      </TouchableOpacity>

      {isPressed && (
        <View className="bg-white px-4">
          <View className="flex-row items-center space-x-2 pb-3">
            <TouchableOpacity onPress={removeItemfromBasket}>
              <MinusCircleIcon
                color={items.length > 0 ? "#00CCBB" : "gray"}
                size={40}
              />
            </TouchableOpacity>
            <Text>{items.length}</Text>
            <TouchableOpacity onPress={addItemToBasket}>
              <PlusCircleIcon color="#00CCBB" size={40} />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

export default DishRow;
