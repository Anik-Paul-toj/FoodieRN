import { StyleSheet, Text, View, ScrollView, StatusBar, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ChevronLeftIcon, ClockIcon, FireIcon, UsersIcon } from 'react-native-heroicons/outline';
import { HeartIcon, Square3Stack3DIcon } from 'react-native-heroicons/solid'
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'
import Loading from '../components/Loading';
import YoutubeIframe from 'react-native-youtube-iframe';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
import { useFavourites } from '../context/FavouritesContext';



const RecipeDetailsScreen = (props) => {
    let item = props.route.params;
    const navigation = useNavigation();
    const { favourites, addFavourite, removeFavourite, isFavourite } = useFavourites();
    const [meal, setMeal] = useState(null);
    const [loading, setLoading] = useState(true)

    const isFav = isFavourite(item.idMeal);

    useEffect(() => {
        getMealData(item.idMeal);
    }, [])



    const getMealData = async (id) => {
        try {
            const response = await axios.get(`https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`);

            if (response?.data?.meals && response.data.meals.length > 0) {
                setMeal(response.data.meals[0]);
            } else {
                console.warn('Meal not found for id:', id);
            }

        } catch (err) {
            console.log('error fetching categories:', err);
        } finally {
            setLoading(false);
        }
    };


    const ingredientIndexes = (meal) => {
        if (!meal) {
            return [];
        }
        let indexes = [];
        for (let i = 1; i <= 20; i++) {
            if (meal['strIngredient' + i]) {
                indexes.push(i);
            }
        }
        return indexes
    }

    const getYoutubeVideoId = url => {
        const regex = /[?&]v=([^&#]+)/;
        const match = url.match(regex);
        if (match && match[1]) {
            return match[1];
        }
        return null;
    };





    return (

        <ScrollView
            style={{ flex: 1, backgroundColor: 'white' }}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 30 }}>
            <StatusBar style={"light"} />

            {/* recipe image */}
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <Animated.Image
                    source={{ uri: item.strMealThumb }}
                    style={{
                        width: wp(98),
                        height: hp(50),
                        borderRadius: 20,
                        borderBottomLeftRadius: 40,
                        borderBottomRightRadius: 40,
                        marginTop: 4,
                    }}
                    sharedTransitionTag={`item.${item.strMeal}`}
                />

            </View>

            {/*back button */}
            <Animated.View entering={FadeIn.delay(200).duration(1000)} style={{ width: '100%', position: 'absolute', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', top: 35 }}>
                <TouchableOpacity style={{ padding: 8, borderRadius: 9999, marginLeft: 20, backgroundColor: 'white' }}
                    onPress={() => navigation.goBack('Home')}>
                    <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color={"#fbbf24"} />
                </TouchableOpacity>

                <TouchableOpacity style={{ padding: 8, borderRadius: 9999, marginRight: 20, backgroundColor: 'white' }}
                    onPress={() => isFav ? removeFavourite(item.idMeal) : addFavourite(item)}>
                    <HeartIcon size={hp(3.5)} strokeWidth={4.5} color={isFav ? '#fbbf24' : 'grey'} />
                </TouchableOpacity>
            </Animated.View>

            {/* meal description */}
            {
                loading ? (
                    <Loading size='large' style={{ marginTop: 64 }} />
                ) : (
                    <View>
                        <Animated.View entering={FadeInDown.duration(700).springify().damping(12)} style={{ paddingHorizontal: 16, flexDirection: 'row', justifyContent: 'space-between', paddingTop: 32, rowGap: 16 }}>
                            {/*name */}
                            <View style={{ paddingHorizontal: 16, flexDirection: 'column', rowGap: 8 }}>
                                <Text style={{ fontSize: hp(3), fontWeight: 'bold', flex: 1, color: '#fbbf24' }}>
                                    {
                                        meal.strMeal
                                    }
                                </Text>
                                {/* cuisine */}
                                <Text style={{ fontSize: hp(2), fontWeight: 'medium', flex: 1, color: '#737373', marginBottom: 15 }}>
                                    {
                                        meal.strArea
                                    }
                                </Text>
                            </View>


                        </Animated.View>
                        {/* misc */}
                        <Animated.View entering={FadeInDown.delay(100).duration(700).springify().damping(12)} style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                            <View style={{ display: 'flex', borderRadius: 9999, backgroundColor: '#fbbf24', padding: 8 }}>
                                <View style={{ height: hp(6.5), width: hp(6.5), backgroundColor: 'white', borderRadius: 9999, alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
                                    <ClockIcon size={hp(4)} strokeWidth={2.5} color={'#525252'} />
                                </View>
                                <View style={{ display: 'flex', alignItems: 'center', paddingVertical: 8, rowGap: 4 }}>
                                    <Text style={{ fontSize: hp(2), fontWeight: 'bold', color: '#404040' }}>
                                        35
                                    </Text>
                                    <Text style={{ fontSize: hp(1.5), fontWeight: 'bold', color: '#404040' }}>
                                        Mins
                                    </Text>
                                </View>
                            </View>

                            <View style={{ display: 'flex', borderRadius: 9999, backgroundColor: '#fbbf24', padding: 8 }}>
                                <View style={{ height: hp(6.5), width: hp(6.5), backgroundColor: 'white', borderRadius: 9999, alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
                                    <UsersIcon size={hp(4)} strokeWidth={2.5} color={'#525252'} />
                                </View>
                                <View style={{ display: 'flex', alignItems: 'center', paddingVertical: 8, rowGap: 4 }}>
                                    <Text style={{ fontSize: hp(2), fontWeight: 'bold', color: '#404040' }}>
                                        3
                                    </Text>
                                    <Text style={{ fontSize: hp(1.5), fontWeight: 'bold', color: '#404040' }}>
                                        Servings
                                    </Text>
                                </View>
                            </View>

                            <View style={{ display: 'flex', borderRadius: 9999, backgroundColor: '#fbbf24', padding: 8 }}>
                                <View style={{ height: hp(6.5), width: hp(6.5), backgroundColor: 'white', borderRadius: 9999, alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
                                    <FireIcon size={hp(4)} strokeWidth={2.5} color={'#525252'} />
                                </View>
                                <View style={{ display: 'flex', alignItems: 'center', paddingVertical: 8, rowGap: 4 }}>
                                    <Text style={{ fontSize: hp(2), fontWeight: 'bold', color: '#404040' }}>
                                        103
                                    </Text>
                                    <Text style={{ fontSize: hp(1.5), fontWeight: 'bold', color: '#404040' }}>
                                        Calories
                                    </Text>
                                </View>
                            </View>

                            <View style={{ display: 'flex', borderRadius: 9999, backgroundColor: '#fbbf24', padding: 8 }}>
                                <View style={{ height: hp(6.5), width: hp(6.5), backgroundColor: 'white', borderRadius: 9999, alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
                                    <Square3Stack3DIcon size={hp(4)} strokeWidth={2.5} color={'#525252'} />
                                </View>
                                <View style={{ display: 'flex', alignItems: 'center', paddingVertical: 8, rowGap: 4 }}>
                                    <Text style={{ fontSize: hp(2), fontWeight: 'bold', color: '#404040' }}>
                                        Easy
                                    </Text>

                                </View>
                            </View>
                        </Animated.View>

                        {/* ingredients */}

                        <Animated.View entering={FadeInDown.delay(200).duration(700).springify().damping(12)} style={{ marginLeft: 30, paddingTop: 16 }}>
                            <Text style={{ fontSize: hp(2.5), fontWeight: 'bold', flex: 1, color: '#404040' }}>
                                Ingredients
                            </Text>
                            <View style={{ rowGap: 8, marginLeft: 12, marginTop: 16 }}>
                                {
                                    ingredientIndexes(meal).map(i => {
                                        return (
                                            <View key={i} style={{ flexDirection: 'row', alignItems: 'center', columnGap: 16 }}>
                                                <View style={{ height: hp(1.5), width: hp(1.5), backgroundColor: '#fbbf24', borderRadius: 9999 }} />

                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                    <Text style={{ fontWeight: '800', color: '#404040', fontSize: hp(1.7) }}>
                                                        {
                                                            meal[`strMeasure${i}`]
                                                        }
                                                    </Text>
                                                    <Text style={{ fontWeight: '500', color: '#525252', marginLeft: 8, fontSize: hp(1.7) }}>
                                                        {
                                                            meal[`strIngredient${i}`]
                                                        }
                                                    </Text>
                                                </View>
                                            </View>

                                        )
                                    })
                                }
                            </View>
                        </Animated.View>
                        {/* instruction */}

                        <Animated.View entering={FadeInDown.delay(300).duration(700).springify().damping(12)} style={{ marginLeft: 30, paddingTop: 16, marginRight: 20 }}>
                            <Text style={{ fontSize: hp(2.5), fontWeight: 'bold', flex: 1, color: '#404040', marginBottom: 12 }}>
                                Instruction
                            </Text>
                            <Text style={{ fontSize: hp(1.5), color: '#404040', fontWeight: '500' }}>
                                {
                                    meal.strInstructions
                                }
                            </Text>

                        </Animated.View>


                        {/*Recipe Video */}
                        {
                            meal.strYoutube && (
                                <Animated.View entering={FadeInDown.delay(400).duration(700).springify().damping(12)} style={{ marginLeft: 30, marginTop: 20 }}>
                                    <Text style={{ fontSize: hp(2.5), fontWeight: 'bold', flex: 1, color: '#404040' }}>
                                        Recipe Video
                                    </Text>
                                    <View style={{ marginRight: 30, justifyContent: 'center', marginTop: 12 }}>

                                        <YoutubeIframe
                                            videoId={getYoutubeVideoId(meal.strYoutube)}
                                            height={hp(30)} />

                                    </View>
                                </Animated.View>
                            )
                        }
                    </View>
                )
            }
        </ScrollView>
    )
}

export default RecipeDetailsScreen

const styles = StyleSheet.create({})