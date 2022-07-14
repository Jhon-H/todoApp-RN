import 'react-native-gesture-handler'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { Navigator } from './src/navigator/Navigator'
import { GoalsContextProvider } from './src/context/GoalsProvider'

const App = () => {
  return (
    <GoalsContextProvider>
      <NavigationContainer>
        <Navigator />
      </NavigationContainer>
    </GoalsContextProvider>
  )
}

export default App
