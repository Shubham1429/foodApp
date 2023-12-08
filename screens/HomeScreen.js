import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { View, Text, Image, TextInput, ScrollView, StatusBar } from 'react-native'
import { ChevronDownIcon, UserIcon, SearchIcon, AdjustmentsIcon } from "react-native-heroicons/outline";
import Categories from '../components/Categories';
import FeaturedRow from '../components/FeaturedRow';
import sanityClient from '../sanity';
import { SafeAreaView } from 'react-native-safe-area-context'

export default function HomeScreen() {
    const navigation = useNavigation();
    const [featuredCategory, setFeaturedCategory] = useState([])
    
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, []);

    useEffect(() => {
        sanityClient.fetch(`
        *[_type == "featured"] {
            ...,
            restaurants[]->{
              ...,
              dishes[]->
            }
          }
        `).then(data => {
            setFeaturedCategory(data)
        })
    }, [])

    return (
        <SafeAreaView className="bg-white flex-1 pt-0">
            {/* <StatusBar networkActivityIndicatorVisible={false} barStyle="default" hidden={false} translucent={true} animated={true}/> */}
            <View className='flex-row pb-3 items-center mx-4 space-x-2'>
                <Image 
                    source={{
                        uri: 'https://links.papareact.com/wru'
                    }}
                    className='h-7 w-7 bg-gray-300 rounded-full p-4'
                />
                <View className="flex-1">
                    <Text className="font-bold text-gray-400 text-xs">Deliver Now!</Text>
                    <Text className="font-bold text-xl">
                        Current Location
                        <ChevronDownIcon size={20} color="#00CCBB" />
                    </Text>
                </View>
                <UserIcon size={35} color="#00CCBB"/>
            </View>

            {/* Search */}

            <View className="flex-row items-center space-x-2 mx-4 pb-2">
                <View className="flex-row flex-1 space-x-2 bg-gray-200 p-3">
                    <SearchIcon color="gray" size={20}/>
                    <TextInput 
                        placeholder="Restaurants and cuisines"
                        keyboardType="default"
                    />
                </View>
                <AdjustmentsIcon color="#00CCBB"/>
            </View>

            {/* Body */}

            <ScrollView className="bg-gray-100" contentContainerStyle={{flexGrow:1, paddingBottom: 20}}>
                <Categories />
                    {featuredCategory?.map((category) => {
                        const { _id = '', name = '', short_description = '' } = category;
                        return(
                            <FeaturedRow
                                key={_id}
                                id={_id}
                                title={name}
                                description={short_description}
                            />
                        )}
                    )}                
            </ScrollView>                       
        </SafeAreaView>
    )
}
