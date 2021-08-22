import React from 'react'

// Navigation imports
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

// Component imports
import Home from './components/Home'
import Detail from './components/Detail'

const Stack = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name='Home' component={ Home } options={{ headerShown: false }} />
        <Stack.Screen name='Detail' component={ Detail } />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
