import { StatusBar, StyleSheet, Text, View,Image } from 'react-native'
import React, { useEffect } from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Animated ,{useSharedValue, withSpring} from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';




const WelcomeScreen = () => {

    const ringOnePadding =useSharedValue(0);
    const ringTwoPadding = useSharedValue(0);
    const navigation = useNavigation();
    useEffect(()=>{
        ringOnePadding.value = 0;
        ringTwoPadding.value =0; 
        setTimeout(()=> ringOnePadding.value = withSpring(ringOnePadding.value+hp(2.8)), 100);
        setTimeout(()=> ringTwoPadding.value = withSpring(ringOnePadding.value+hp(3.3)), 300);
    
        setTimeout(()=> navigation.navigate('Home'), 2500)
    
    },[])
    return (
        <View style={styles.container}>
            <StatusBar style="light"/>

            {/* logo image */}
            <Animated.View style={{backgroundColor: 'rgba(255, 255, 255, 0.2)',borderRadius: 9999, padding:ringTwoPadding}}>
                    <Animated.View style={{backgroundColor: 'rgba(255, 255, 255, 0.2)',borderRadius: 9999,padding:ringTwoPadding}}>
                        <Image source={require('../../assets/splash.png')} 
                        style={{width:hp(20), height:hp(20)}}/>
                    </Animated.View>
            </Animated.View>

            {/*tile */}
            <View style={{alignItems: 'center',rowGap: 8,}}>
                    <Text style={{ fontWeight: 'bold', color: '#ffffff',letterSpacing: 2, fontSize:hp(7)}}>
                        Foody
                    </Text>
                    <Text style={{ fontWeight: 'medium', color: '#ffffff',letterSpacing: 2,fontSize:hp(2)}}>
                    Discover flavors, 
                    </Text>
                    <Text style={{ fontWeight: 'medium', color: '#ffffff',letterSpacing: 2,fontSize:hp(2)}}>
                    one recipe at a time!
                    </Text>
            </View> 
        </View>
    )
}

export default WelcomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        rowGap: 40,
        backgroundColor: '#f59e0b',
    },
})