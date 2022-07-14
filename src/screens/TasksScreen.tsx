import React, { useContext, useEffect, useState } from 'react'
import { FlatList, Text, View, StyleSheet, Dimensions, StatusBar } from 'react-native'
import Svg, { Path } from 'react-native-svg'
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../navigator/Navigator';
import { GoalsContext } from '../context/GoalsProvider';
import { Task } from '../utils/interfaces/goal.interface';
import NewTaskCard from '../components/NewTaskCard';
import TaskSeparator from '../components/TaskSeparator';
import TaskScreenHeader from '../components/TaskScreenHeader';
import TaskCard from '../components/TaskCard';

interface Props extends StackScreenProps<RootStackParamList, 'TasksScreen'> {}

const TasksScreen = ({ route }: Props) => {
  const { idGoal, goalName, color } = route.params
  const { goals } = useContext(GoalsContext)
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    const tasksOfCurrentGoal = goals.find(goal => goal.id === idGoal)
    setTasks(tasksOfCurrentGoal?.tasks || [])
  }, [goals])

  return (
    <View>
      {/* Change color statusBar */}
      <StatusBar backgroundColor={color}/>

      <FlatList
        data={tasks}
        renderItem={({ item }) => <TaskCard {...item} idGoal={idGoal} />}
        keyExtractor={({ id }) => `${id}`}

        ItemSeparatorComponent={TaskSeparator}
        ListHeaderComponent={() => <TaskScreenHeader color={color} title={goalName}/>}
      />

      <NewTaskCard idGoal={idGoal}/>
    </View>
  )
}

export default TasksScreen
