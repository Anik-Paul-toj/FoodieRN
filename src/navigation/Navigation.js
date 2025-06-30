import { StyleSheet } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import HomeScreens from '../Screens/HomeScreens'
import WelcomeScreen from '../Screens/WelcomeScreen'
import RecipeDetailsScreen from '../Screens/RecipeDetailsScreen'
import FavouritesScreen from '../Screens/FavouritesScreen'

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome" screenOptions={{headerShown:false}}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreens} options={{ headerShown: false }} />
        <Stack.Screen name="RecipeScreen" component={RecipeDetailsScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Favourites" component={FavouritesScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;

const styles = StyleSheet.create({});
