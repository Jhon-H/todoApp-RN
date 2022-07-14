import React, { createContext, useEffect, useReducer } from 'react';
import { getDataStorage } from '../utils/helpers/globalHelpers';
import { Goal } from '../utils/interfaces/goal.interface';
import { goalsReducer } from './goalsReducer';

const initialState: Goal[] = [
  {
    id: 1,
    title: 'Work',
    icon: 'medical',
    dateCreation: new Date(2021, 4, 23, 10, 11),
    completedGoals: 3,
    totalGoals: 4,
    color: '#1b1b3a',
    tasks: [
      {id: 1, text: 'Exto es un texoadasd', status: 'COMPLETED'},
      {id: 2, text: 'Ea voluptate ad eiusmod exercitation culpa elit quis.', status: 'ACTIVED'},
      {id: 3, text: 'Dolor id in eu voluptate consectetur excepteur aute. Ipsum enim exercitation mollit irure minim in reprehenderit quis elit tempor exercitation do commodo in. Aliquip ad consectetur sit nulla nostrud eu id amet velit amet cillum. Consequat tempor labore commodo deserunt qui eu est reprehenderit consequat cupidatat. Fugiat ea occaecat nulla sit.', status: 'ACTIVED'},
      {id: 4, text: 'Reprehenderit sint laborum deserunt eiusmod mollit reprehenderit sit ullamco sint.', status: 'ACTIVED'},
      {id: 5, text: 'Commodo laborum sit esse qui magna qui pariatur nulla adipisicing fugiat Lorem voluptate.', status: 'ACTIVED'},
    ],
  },
  {
    id: 2,
    title: 'Health',
    icon: 'code-working',
    dateCreation: new Date(2021, 4, 23, 10, 11),
    completedGoals: 6,
    totalGoals: 12,
    color: '#fb9f89',
    tasks: []
  },
  {
    id: 3,
    title: 'Private',
    icon: 'american-football',
    dateCreation: new Date(2021, 4, 23, 10, 11),
    completedGoals: 1,
    totalGoals: 3,
    color: '#21a179',
    tasks: []
  },
  {
    id: 4,
    title: 'This is a quite long goal to fit',
    dateCreation: new Date(2021, 4, 23, 10, 11),
    completedGoals: 1,
    totalGoals: 3,
    tasks: []
  },
]

type GoalsContextProps = {
  goals: Goal[];
  modifyTask: (idGoal: number, idTask: number, value: string) => void;
  deleteTask: (idGoal: number, idTask: number) => void;
  addTask: (idGoal: number, idNewTask: number, value: string) => void;
  toggleCompleteTask: (idGoal: number, idTask: number, state: boolean) => void;
}

export const GoalsContext = createContext({} as GoalsContextProps)

export const GoalsContextProvider = ({ children }: any) => {
  const [goals, dispatch] = useReducer(goalsReducer, initialState)

  useEffect(() => {
    getDataStorage()
      .then(data => {
        dispatch({
          type: 'SET_GOALS',
          payload: { goals: data }
        })
      })
  }, [])

  const modifyTask = (idGoal: number, idTask: number, value: string) => {
    dispatch({
      type: 'MODIFY_TASK',
      payload: { idGoal, idTask, value }
    })
  }

  const deleteTask = (idGoal: number, idTask: number) => {
    dispatch({
      type: 'DELETE_TASK',
      payload: { idGoal, idTask }
    })
  }

  const addTask = (idGoal: number, idNewTask: number, value: string) => {
    dispatch({
      type: 'ADD_TASK',
      payload: { idGoal, idNewTask, value }
    })
  }

  const toggleCompleteTask = (idGoal: number, idTask: number, state: boolean) => {
    dispatch({
      type: 'TOGGLE_COMPLETE_TASK',
      payload: { idGoal, idTask, state }
    })
  }

  return (
    <GoalsContext.Provider value={{
      goals,
      modifyTask,
      deleteTask,
      addTask,
      toggleCompleteTask
    }}>
      {children}
    </GoalsContext.Provider>
  )
}
