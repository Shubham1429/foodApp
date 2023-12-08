import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { ArrowRightIcon } from 'react-native-heroicons/outline'
import sanityClient from '../sanity'
import RestaurantCard from './RestaurantCard'

const FeaturedRow = ({ title = '', description = '', id = '' }) => {

    const [restaurants, setRestaurants] = useState([]);
    
    useEffect(() => {
        sanityClient.fetch(`
        *[_type == "featured" && _id == $id] {
            ...,
            restaurants[]->{
              ...,
              dishes[]->,
              type-> {
                  name
              }
            },
          }[0] 
        `,{ id }).then(data => {
            setRestaurants(data?.restaurants)
        })
    },[id]);

    return (
        <View>
            <View className="flex-row items-center justify-between mt-4 px-4">
                <Text className='font-bold text-lg'>{title}</Text>
                <ArrowRightIcon color="#00CCBB"/>
            </View>
            <Text className="text-xs text-gray-500 px-4">{description}</Text>
            <ScrollView
                horizontal
                contentContainerStyle={{
                    paddingHorizontal: 15
                }}
                showsHorizontalScrollIndicator={false}
                className="pt-4"
            >
                {/* Restaurant Cards */}
                {
                    restaurants?.map((restaurant) => {
                        const { _id = "", image = "", address = "", name = "", dishes = [], rating = "", short_description = "", type = "", long = "", lat = "" } = restaurant;
                        const { name: genre = "" } = type;
                        return (
                            <RestaurantCard 
                                key={_id}
                                id={_id}
                                imgUrl={image}
                                title={name}
                                rating={rating}
                                genre={genre}
                                address={address}
                                short_description={short_description}
                                dishes={dishes}
                                long={long}
                                lat={lat}
                            />
                        )
                    })
                }
            </ScrollView>
        </View>
    )
}

export default FeaturedRow
