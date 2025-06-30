import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import React from 'react';
import Animated,{FadeInDown} from 'react-native-reanimated';

const Categories = ({activeCategory, handleChangeCategory, categories}) => {
  return (
    <Animated.View entering={FadeInDown.duration(500).springify()}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {categories.map((cat, index) => {
          let isActive = cat.strCategory === activeCategory;
          let activeButtonClass = isActive ? '#fbbf24' : 'rgba(0, 0, 0, 0.1)';
          return (
            <TouchableOpacity
              key={index}
              style={{
                alignItems: 'center',
                marginRight: 16, 
                marginTop:12
              }}
              onPress={()=> handleChangeCategory(cat.strCategory)}
            >
              <View style={{ borderRadius: 9999, padding: 6, backgroundColor: activeButtonClass }}>
                <Image
                  source={{ uri: cat.strCategoryThumb }}
                  style={{ width: hp(6), height: hp(6), borderRadius: 9999 }}
                />
              </View>
              <Text style={{ color: '#525252', fontSize:hp(1.6)}}>
                {cat.strCategory}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </Animated.View>
  );
};

export default Categories;

const styles = StyleSheet.create({});
