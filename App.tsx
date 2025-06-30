import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Navigation from './src/navigation/Navigation'
import { FavouritesProvider } from './src/context/FavouritesContext'

const App = () => {
  return (
    <FavouritesProvider>
      <Navigation/>
    </FavouritesProvider>
  )
}

export default App

const styles = StyleSheet.create({})