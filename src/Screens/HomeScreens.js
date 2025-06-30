import { Image, ScrollView, StatusBar, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { BellIcon, HeartIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline'
import Categories from '../components/Categories';
import axios from 'axios'
import Recipes from '../components/Recipes';
import { useNavigation } from '@react-navigation/native';


const HomeScreens = () => {

  const [activeCategory, setActiveCategory] = useState('Starter')
  const [categories, setCategories] = useState([])
  const [meals, setMeals] = useState([])
  const [searchText, setSearchText] = useState('')
  const navigation = useNavigation();

  const getCategories = async() =>{
    try{
      const response = await axios.get('https://themealdb.com/api/json/v1/1/categories.php');

      if (response && response.data) {
        const filteredCategories = response.data.categories.filter(cat => cat.idCategory !== '1');
        setCategories(filteredCategories);
        setActiveCategory(filteredCategories[0]?.strCategory || '');
      } 
    }catch(err){
      console.log('error fetching categories:', err)
    }

  }

  const getRecipes = async(category='Chicken') =>{
    try{
      const response = await axios.get(`https://themealdb.com/api/json/v1/1/filter.php?c=${category}`);

      if (response && response.data) {
        setMeals(response.data.meals)
      } 
    }catch(err){
      console.log('error fetching recipes:', err)
    }

  }

  const handleChangeCategory = category =>{
    getRecipes(category);
    setActiveCategory(category);
    setMeals([]);
    setSearchText('');
  }

  useEffect(()=>{
    getCategories();
    getRecipes();
  },[])

  const searchItems = async(query) =>{
    if(!query) return;
    try{
      const response = await axios.get(`https://themealdb.com/api/json/v1/1/search.php?s=${query}`);

      if (response && response.data) {
        setMeals(response.data.meals)
        setActiveCategory('')
      } 
    }catch(err){
      console.log('error searching recipes:', err)
    }

  }



  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBar style='dark' />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
        style={{ rowGap: 24, paddingTop: 20, }}>

        {/* Avatar And a BEll icon */}
        <View style={{ marginHorizontal: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8,marginTop:12 }}>
          <Image source={require('../../assets/avatar.png')} style={{ height: hp(5), width: hp(5.5), }} />
          <View style={{flexDirection:'row', gap:8}}>
            <HeartIcon size={hp(4)} strokeWidth={1.5} color= 'grey' onPress={() => navigation.navigate('Favourites')} />
            <BellIcon size={hp(4)} color='grey' />
          </View>
        </View>
        {/* greetigs and  punchline */}
        <View style={{ marginHorizontal: 16, marginBottom: 8, rowGap: 8, }}>
          <Text style={{ fontSize: hp(1.7), color: '#525252', }}>Hello !</Text>
          <View>
            <Text style={{ fontWeight: '600', color: '#525252', fontSize: hp(3.8) }}>
              Make your own food
            </Text>
          </View>
          <Text style={{ fontWeight: '600', color: '#525252', fontSize: hp(3.8) }}>
            Eat at <Text style={{ color: '#fbbf24', }}>Home</Text>
          </Text>
        </View>

        {/* search bar */}
        <View style={{ marginHorizontal: 16, marginTop:12, flexDirection: 'row', alignItems: 'center', borderRadius: 9999, backgroundColor: 'rgba(0,0,0,0.05)', padding: 6, }}>
          <TextInput
            placeholder='Search any recipe'
            placeholderTextColor={'grey'}
            style={{ flex: 1, fontSize: 16, marginBottom: 4, paddingLeft: 12, letterSpacing: 1, fontSize: hp(1.7) }}
            value={searchText}
            onChangeText={text => setSearchText(text)}
            onSubmitEditing={() => searchItems(searchText)}
             />

          <TouchableOpacity onPress={() => searchItems(searchText)} style={{ backgroundColor: '#ffffff', borderRadius: 9999, padding: 12 }}>
            <MagnifyingGlassIcon size={hp(2.7)} strokeWidth={3} color='grey' />
          </TouchableOpacity>
        </View>
      {/* categories */}
      <View>
        {categories.length>0 && <Categories activeCategory={activeCategory} handleChangeCategory={handleChangeCategory} categories={categories}/> }
      </View>

      {/* Recipes */}
      <View>
        <Recipes meals={meals} categories={categories}/>
      </View>
      </ScrollView>
    </View>
  )
}

export default HomeScreens

const styles = StyleSheet.create({})