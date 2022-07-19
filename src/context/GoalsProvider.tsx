import React, { createContext, useEffect, useReducer } from 'react';
import { getDataStorage, setDataStorage } from '../utils/helpers/globalHelpers';
import { Goal } from '../utils/interfaces/goal.interface';
import { GoalActionContext, goalsReducer } from './goalsReducer';

const initialState: Goal[] = [
  {
    id: 1,
    title: 'Work',
    icon: 'medical',
    dateCreation: new Date(2021, 4, 23, 10, 11),
    color: '#1b1b3a',
    tasks: [
      {id: 1, text: 'Exto es un texoadasd', status: 'COMPLETED'},
      {id: 2, text: 'Ea voluptate ad eiusmod exercitation culpa elit quis.', status: 'ACTIVED'},
      {id: 3, text: 'Dolor id in eu voluptate consectetur excepteur aute. Ipsum enim exercitation mollit irure minim in reprehenderit quis elit tempor exercitation do commodo in. Aliquip ad consectetur sit nulla nostrud eu id amet velit amet cillum. Consequat tempor labore commodo deserunt qui eu est reprehenderit consequat cupidatat. Fugiat ea occaecat nulla sit.', status: 'ACTIVED'},
      {id: 4, text: 'Reprehenderit sint laborum deserunt eiusmod mollit reprehenderit sit ullamco sint.', status: 'ACTIVED'},
      {id: 5, text: 'Commodo laborum sit esse qui magna qui pariatur nulla adipisicing fugiat Lorem voluptate.', status: 'ACTIVED'},
      {id: 6, text: 'Anim occaecat ea tempor cillum deserunt nostrud quis aute ea. Voluptate aliquip duis nisi labore veniam excepteur duis officia irure adipisicing ullamco Lorem deserunt mollit. Exercitation aliqua excepteur laborum fugiat adipisicing. Occaecat tempor ut ea in minim quis pariatur.', status: 'ACTIVED'},
      {id: 7, text: 'Anim occaecat ea tempor cillum deserunt nostrud quis aute ea. Voluptate aliquip duis nisi labore veniam excepteur duis officia irure adipisicing ullamco Lorem deserunt mollit. Exercitation aliqua excepteur laborum fugiat adipisicing. Occaecat tempor ut ea in minim quis pariatur.', status: 'ACTIVED'},
      {id: 8, text: 'Anim occaecat ea tempor cillum deserunt nostrud quis aute ea. Voluptate aliquip duis nisi labore veniam excepteur duis officia irure adipisicing ullamco Lorem deserunt mollit. Exercitation aliqua excepteur laborum fugiat adipisicing. Occaecat tempor ut ea in minim quis pariatur.', status: 'ACTIVED'},
      {id: 9, text: 'Anim occaecat ea tempor cillum deserunt nostrud quis aute ea. Voluptate aliquip duis nisi labore veniam excepteur duis officia irure adipisicing ullamco Lorem deserunt mollit. Exercitation aliqua excepteur laborum fugiat adipisicing. Occaecat tempor ut ea in minim quis pariatur.', status: 'ACTIVED'},
      {id: 10, text: 'Anim occaecat ea tempor cillum deserunt nostrud quis aute ea. Voluptate aliquip duis nisi labore veniam excepteur duis officia irure adipisicing ullamco Lorem deserunt mollit. Exercitation aliqua excepteur laborum fugiat adipisicing. Occaecat tempor ut ea in minim quis pariatur.', status: 'ACTIVED'},
      {id: 11, text: 'Anim occaecat ea tempor cillum deserunt nostrud quis aute ea. Voluptate aliquip duis nisi labore veniam excepteur duis officia irure adipisicing ullamco Lorem deserunt mollit. Exercitation aliqua excepteur laborum fugiat adipisicing. Occaecat tempor ut ea in minim quis pariatur.', status: 'ACTIVED'},
      {id: 12, text: 'Anim occaecat ea tempor cillum deserunt nostrud quis aute ea. Voluptate aliquip duis nisi labore veniam excepteur duis officia irure adipisicing ullamco Lorem deserunt mollit. Exercitation aliqua excepteur laborum fugiat adipisicing. Occaecat tempor ut ea in minim quis pariatur.', status: 'ACTIVED'},
      {id: 13, text: 'Anim occaecat ea tempor cillum deserunt nostrud quis aute ea. Voluptate aliquip duis nisi labore veniam excepteur duis officia irure adipisicing ullamco Lorem deserunt mollit. Exercitation aliqua excepteur laborum fugiat adipisicing. Occaecat tempor ut ea in minim quis pariatur.', status: 'ACTIVED'},
    ],
  },
  {
    id: 2,
    title: 'Health',
    icon: 'code-working',
    dateCreation: new Date(2021, 4, 23, 10, 11),
    color: '#fb9f89',
    tasks: [
      {id: 1, text: 'Anim occaecat ea tempor cillum deserunt nostrud quis aute ea. Voluptate aliquip duis nisi labore veniam excepteur duis officia irure adipisicing ullamco Lorem deserunt mollit. Exercitation aliqua excepteur laborum fugiat adipisicing. Occaecat tempor ut ea in minim quis pariatur.', status: 'ACTIVED'},
    ]
  },
  {
    id: 3,
    title: 'Private',
    icon: 'american-football',
    dateCreation: new Date(2021, 4, 23, 10, 11),
    color: '#21a179',
    tasks: []
  },
  {
    id: 4,
    title: 'This is a quite long goal to fit',
    dateCreation: new Date(2021, 4, 23, 10, 11),
    tasks: []
  },
  {
    id: 5,
    title: 'This is a quite long goal to fit',
    dateCreation: new Date(2021, 4, 23, 10, 11),
    tasks: []
  },
  {
    id: 6,
    title: 'This is a quite long goal to fit',
    dateCreation: new Date(2021, 4, 23, 10, 11),
    tasks: []
  },
  {
    id: 7,
    title: 'This is a quite long goal to fit',
    dateCreation: new Date(2021, 4, 23, 10, 11),
    tasks: []
  },
  {
    id: 8,
    title: 'This is a quite long goal to fit',
    dateCreation: new Date(2021, 4, 23, 10, 11),
    tasks: []
  },
  {
    id: 9,
    title: 'This is a quite long goal to fit',
    dateCreation: new Date(2021, 4, 23, 10, 11),
    tasks: []
  },
]

type GoalsContextProps = {
  goals: Goal[];
  modifyTask: (idGoal: number, idTask: number, value: string) => void;
  deleteTask: (idGoal: number, idTask: number) => void;
  deleteMutiplesTask: (idGoal: number,taskToDelete: number[]) => void;
  addTask: (idGoal: number, idNewTask: number, value: string) => void;
  toggleCompleteTask: (idGoal: number, idTask: number, state: boolean) => void;
}

export const GoalsContext = createContext({} as GoalsContextProps)

export const GoalsContextProvider = ({ children }: any) => {
  const [goals, dispatch] = useReducer(goalsReducer, initialState)

  // useEffect(() => {
  //   getDataStorage()
  //     .then(data => {
  //       dispatch({
  //         type: 'SET_GOALS',
  //         payload: { goals: data }
  //       })
  //     })
  // }, [])

  // Before dispatch action, execute middlewares
  const dispatchWithMiddlewares = (data: GoalActionContext) => {
    dispatch(data)

    // *middlewares after
    setDataStorage(goals)
      .then(() => {console.log('SAVE DATA')})
      .catch(() => {console.log('DATA NOT SAVE')})

  }

  const modifyTask = (idGoal: number, idTask: number, value: string) => {
    dispatchWithMiddlewares({
      type: 'MODIFY_TASK',
      payload: { idGoal, idTask, value }
    })
  }

  const deleteTask = (idGoal: number, idTask: number) => {
    dispatchWithMiddlewares({
      type: 'DELETE_TASK',
      payload: { idGoal, idTask }
    })
  }

  const deleteMutiplesTask = (idGoal: number, taskToDelete: number[]) => {
    taskToDelete.forEach( idTaskToDelete => {
      dispatchWithMiddlewares({
        type: 'DELETE_TASK',
        payload: { idGoal, idTask: idTaskToDelete }
      })
    })
  }

  const addTask = (idGoal: number, idNewTask: number, value: string) => {
    dispatchWithMiddlewares({
      type: 'ADD_TASK',
      payload: { idGoal, idNewTask, value }
    })
  }

  const toggleCompleteTask = (idGoal: number, idTask: number, state: boolean) => {
    dispatchWithMiddlewares({
      type: 'TOGGLE_COMPLETE_TASK',
      payload: { idGoal, idTask, state }
    })
  }

  return (
    <GoalsContext.Provider value={{
      goals,
      modifyTask,
      deleteTask,
      deleteMutiplesTask,
      addTask,
      toggleCompleteTask
    }}>
      {children}
    </GoalsContext.Provider>
  )
}
