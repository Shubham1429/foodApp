import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { urlFor } from '../sanity'

const CategoryCard = ({ imgUrl, title = '' }) => {
    return (
        <TouchableOpacity className=" mr-2 bg-white shadow">
            <Image 
                source={{
                    uri: imgUrl
                }}
                className="h-20 w-20 rounded"
            />
            <View>
            <Text className=" bottom-1 left-1 pt-2 text-xs text-gray-500">{title}</Text>

            </View>
        </TouchableOpacity>
    )
}

export default CategoryCard
