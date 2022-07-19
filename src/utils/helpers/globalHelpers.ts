import AsyncStorage from '@react-native-async-storage/async-storage'
import moment from 'moment'
import { Goal } from '../interfaces/goal.interface'

export const convertDateToRelativeTime = (date: Date): string => {
  return moment(date).fromNow()
}


export const getLargestIdTask = (idGoal: number, goals: Goal[]): number => {
  let greaterIdTask = 0;

  goals
  .find(goal => goal.id === idGoal)?.tasks
  .forEach(task => {
    if (task.id > greaterIdTask) {
      greaterIdTask = task.id
    }
  })

  return greaterIdTask
}


export const getTotalTasks = (idGoal: number, goals: Goal[]) => {
  return goals.find(goal => goal.id === idGoal)?.tasks.length || 0
}


export const getTotalCompletedTasks = (idGoal: number, goals: Goal[]) => {
  return goals.find(goal => goal.id === idGoal)?.tasks.filter(tk => tk.status === 'COMPLETED').length || 0
}


export const getDataStorage = async () => {
  try {
    const data = await AsyncStorage.getItem('@goals')
    let goals: Goal[] = []

    if (data !== null) {
      goals = JSON.parse(data)
    }

    return goals

  } catch (e) {
    return []
  }
}


export const setDataStorage = async (goals: Goal[]) => {
  try {
    await AsyncStorage.setItem('@goals', JSON.stringify(goals))

  } catch (e) { }
}

