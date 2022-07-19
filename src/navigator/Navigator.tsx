import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from '../screens/HomeScreen';
import TasksScreen from '../screens/TasksScreen';
import NewCardGoalScreen from '../screens/NewCardGoalScreen';

export type RootStackParamList = {
  HomeScreen: undefined;
  TasksScreen: {
    idGoal: number;
    goalName: string;
    color: string;
  };
  NewCardGoalScreen: undefined;
}

const Stack = createStackNavigator<RootStackParamList>()

export const Navigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: '#fff'
        },
      }}
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="TasksScreen" component={TasksScreen} />
      <Stack.Screen name="NewCardGoalScreen" component={NewCardGoalScreen} />
    </Stack.Navigator>
  )
}


