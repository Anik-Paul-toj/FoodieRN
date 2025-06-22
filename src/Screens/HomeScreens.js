import { ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const HomeScreens = () => {
  return (
    <View style={{flex:1, backgroundColor:'white'}}>
      <StatusBar style='dark'/>
      <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{paddingBottom:50}}
      style={{ rowGap: 24, paddingTop: 56,}}>

        {/* Avatar And a BEll icon */}

      </ScrollView>
    </View>
  )
}

export default HomeScreens

const styles = StyleSheet.create({})