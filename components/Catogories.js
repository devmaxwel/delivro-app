import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import CategoryCard from "./CategoryCard";
import client from "../sanity";

const Catogories = () => {
  const [categories, setCategories] = useState();
  useEffect(() => {
    client
      .fetch(
        `*[_type =="category"]{
  ...,
}`
      )
      .then((data) => {
        setCategories(data);
      });
  }, []);
  return (
    <ScrollView
      contentContainerStyle={{
        paddingHorizontal: 15,
        paddingTop: 10,
      }}
      horizontal
      showsVerticalScrollIndicator={false}
    >
      {/* CategoryCard */}
      {categories?.map((category) => {
        return (
          <CategoryCard
            key={category._id}
            imgUrl={category.image}
            title={category.name}
          />
        );
      })}
    </ScrollView>
  );
};

export default Catogories;
