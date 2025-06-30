import React from 'react';
import { ScrollView, Text, View, TouchableOpacity } from 'react-native';
import { useFavourites } from '../context/FavouritesContext';
import { ChevronLeftIcon, ClockIcon, FireIcon, UsersIcon } from 'react-native-heroicons/outline';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { HeartIcon, Square3Stack3DIcon } from 'react-native-heroicons/solid'
import { useNavigation } from '@react-navigation/native';

import Recipes from '../components/Recipes';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';

const FavouritesScreen = () => {
  const { favourites } = useFavourites();
  const navigation = useNavigation();

  return (
    <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>

      {/*back button */}
      <Animated.View entering={FadeIn.delay(200).duration(1000)} style={{ width: '100%', flexDirection: 'row', alignItems: 'center', top: 35 }}>
        <TouchableOpacity style={{ padding: 8, borderRadius: 9999, marginLeft: 20, backgroundColor: 'white' }}
          onPress={() => navigation.goBack('Home')}>
          <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color={"#fbbf24"} />
        </TouchableOpacity>
        <View>
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#fbbf24' }}>Favourites</Text>
        </View>

      </Animated.View>


      <View style={{ marginHorizontal: 16, marginTop: 50 }}>
        <Recipes meals={favourites} />
      </View>



    </ScrollView>
  );
};

export default FavouritesScreen; 