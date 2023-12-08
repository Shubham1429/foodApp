import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView } from 'react-native'
import sanityClient, { urlFor } from '../sanity';
import CategoryCard from './CategoryCard'

const Categories = () => {

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        sanityClient.fetch(`
            *[_type == "category" ] 
        `).then((data) => {
            setCategories(data);
        })
    },[])

    return (
        <ScrollView 
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
                paddingHorizontal: 15,
                paddingTop: 10
            }}
        >
            {/* Category Card */}
            {
                categories?.map((category) => {
                    const { _id = "", image = "", name = '' } = category;
                    return (
                        <CategoryCard 
                            key={_id}
                            imgUrl={urlFor(image).width(600).url()}
                            title={name}
                        />
                    )
                })
            }
        </ScrollView>
    )
}

export default Categories
