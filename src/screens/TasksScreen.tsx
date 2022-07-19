import React, { useContext, useEffect, useState } from 'react'
import { FlatList, StatusBar, StyleSheet, View } from 'react-native'
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
  const { goals, deleteMutiplesTask } = useContext(GoalsContext)
  const [tasks, setTasks] = useState<Task[]>([])
  const [taskToDelete, setTaskToDelete] = useState<number[]>([])

  const addTaskToDelete = (id: number) => {
    setTaskToDelete([
      ...taskToDelete,
      id
    ])
  }

  const quitTaskToDelete = (id: number) => {
    setTaskToDelete(
      taskToDelete.filter(idTask => idTask !== id)
    )
  }

  const deleteTasks = () => {
    deleteMutiplesTask(idGoal, taskToDelete)
    setTaskToDelete([])
  }

  useEffect(() => {
    const tasksOfCurrentGoal = goals.find(goal => goal.id === idGoal)
    setTasks(tasksOfCurrentGoal?.tasks || [])
  }, [goals, idGoal])

  return (
    <View style={ styles.container }>
      {/* Change color statusBar */}
      <StatusBar backgroundColor={color} />

      <FlatList
        data={tasks}
        renderItem={({ item }) => (
          <TaskCard
            {...item}
            idGoal={idGoal}
            addTaskToDelete={addTaskToDelete}
            quitTaskToDelete={quitTaskToDelete}
            taskToDelete={taskToDelete}
          />
        )}
        keyExtractor={({ id }) => `${id}`}

        ItemSeparatorComponent={TaskSeparator}
        ListHeaderComponent={() => (
          <TaskScreenHeader
            color={color}
            title={goalName}
            numberOfTaskToDelete={taskToDelete.length}
            deleteTasks={deleteTasks}
          />
        )}
        ListFooterComponent={() => <NewTaskCard idGoal={idGoal} />}

        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20
  }
});

export default TasksScreen
