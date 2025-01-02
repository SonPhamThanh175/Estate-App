import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

const {id} = useLocalSearchParams();
const Property = () => {
  return (
    <View>
      <Text>Property {id}</Text>
    </View>
  )
}

export default Property