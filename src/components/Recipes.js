import { Pressable, StyleSheet, Text, View, Image } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import MasonryList from '@react-native-seoul/masonry-list';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { HeartIcon } from 'react-native-heroicons/solid';
import { useFavourites } from '../context/FavouritesContext';

import React from 'react'
import Loading from './Loading';

const Recipes = ({ categories, meals }) => {
    const navigation = useNavigation();
    return (
        <View style={{ marginHorizontal: 16, rowGap: 12, marginTop: 12 }}>
            <Text style={{ fontSize: hp(3), fontWeight: '600', color: '#525252' }}>Recipes</Text>
            <View>
                {
                    categories && (categories.length === 0 || meals.length === 0) ? (
                        <Loading size="large" style={{ marginTop: 120 }} />
                    ) : meals && meals.length > 0 ? (
                        <MasonryList
                            data={meals}
                            keyExtractor={(item) => item.idMeal}
                            numColumns={2}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item, i }) => <RecipeCard item={item} index={i} navigation={navigation} />}
                            onEndReachedThreshold={0.1}
                        />
                    ) : (
                        <Text style={{ textAlign: 'center', marginTop: 20 }}>No favourite recipes found.</Text>
                    )
                }
            </View>
        </View>

    )
}

const RecipeCard = ({ item, index, navigation }) => {
    let isEven = index % 2 === 0;
    const { addFavourite, removeFavourite, isFavourite } = useFavourites();
    const fav = isFavourite(item.idMeal);

    return (
        <Animated.View entering={FadeInDown.delay(index * 100).duration(600).springify().damping(20)}>
            <Pressable
                style={{
                    width: '100%',
                    justifyContent: 'center',
                    marginBottom: 16,
                    rowGap: 4,
                    paddingLeft: isEven ? 0 : 8,
                    paddingRight: isEven ? 8 : 0,
                }}
                onPress={()=>navigation.navigate('RecipeScreen', {...item, sharedTransitionTag: `meal-image-${item.idMeal}`})}
            >
                <Animated.Image
                    source={{ uri: item.strMealThumb }}
                    style={{
                        width: '100%',
                        height: index % 3 === 0 ? hp(25) : hp(35),
                        backgroundColor: 'rgba(0, 0, 0, 0.05)',
                        borderRadius: 24,
                        resizeMode: 'cover',
                    }}
                    sharedTransitionTag={item.strMeal}
                />
                <Pressable
                  style={{ position: 'absolute', top: 10, right: 10, zIndex: 10 }}
                  onPress={() => fav ? removeFavourite(item.idMeal) : addFavourite(item)}
                >
                  <HeartIcon size={28} color={fav ? 'red' : 'grey'} />
                </Pressable>
                <View style={{
                    backgroundColor: '#f8f8f8',
                    marginHorizontal: 0,
                    marginTop: -24,
                    borderBottomLeftRadius: 16,
                    borderBottomRightRadius: 16,
                    paddingVertical: 8,
                    alignItems: 'center',
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.08,
                    shadowRadius: 2,
                    elevation: 1,
                }}>
                    <Text style={{ fontWeight: '600', color: '#525252', fontSize: hp(1.5), textAlign: 'center' }}>
                        {
                            item.strMeal.length ? item.strMeal.slice(0, 20) + '...' : item.strMeal
                        }
                    </Text>
                </View>
            </Pressable>
        </Animated.View>
    );
};


export default Recipes

const styles = StyleSheet.create({})