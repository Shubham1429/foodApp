import { useNavigation } from '@react-navigation/native'
import React, { useEffect } from 'react'
import { View, Text, SafeAreaView } from 'react-native'
import * as Animatable from 'react-native-animatable'
import * as Progress from 'react-native-progress'

const PrepairingOrderScreen = () => {
    const navigation = useNavigation();
    
    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('Delivery')
        },5000)
    }, [])
    
    return (
        <SafeAreaView className='bg-[#1f94b1] flex-1 justify-center items-center'>
            <Animatable.Image 
                source={require('../assets/giphy.gif')}
                animation='slideInUp'
                iterationCount={1}
                className='h-96 w-96'
            />
            <Animatable.Text
                animation='slideInUp'
                iterationCount={1}
                className='text-lg text-white font-bold text-center my-10'
            >
                Waiting for Restaurant to accept your order!
            </Animatable.Text>
            <Progress.Circle size={60} indeterminate={true} color='white'/>
        </SafeAreaView>
    )
}

export default PrepairingOrderScreen
