import React from 'react'
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const DeliveryScreen = () => {
    const navigation = useNavigation();
    return (
        <SafeAreaView className='flex-1 bg-white'>
            <View className='flex-1 bg-gray-200'>
                <TouchableOpacity className='rounded-lg bg-[#00ccbb] p-4' onPress={() => navigation.navigate('Home')}>
                    <Text className='text-center text-white text-lg font-bold'>Back To Home</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
        
    )
}

export default DeliveryScreen
