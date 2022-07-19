import { Goal } from '../utils/interfaces/goal.interface'


export type GoalActionContext =
  | { type: 'MODIFY_TASK', payload: {idGoal: number, idTask: number, value: string}}
  | { type: 'MODIFY_GOAL'}
  | { type: 'ADD_TASK', payload: {idGoal: number, idNewTask: number, value: string}}
  | { type: 'ADD_GOAL'}
  | { type: 'DELETE_TASK', payload: {idGoal: number, idTask: number}}
  | { type: 'DELETE_GOAL'}
  | { type: 'COMPLETE_TASK'}
  | { type: 'TOGGLE_COMPLETE_TASK', payload: {idGoal: number, idTask: number, state: boolean}}
  | { type: 'SET_GOALS', payload: {goals: Goal[]}}

export const goalsReducer = (state: Goal[], action: GoalActionContext): Goal[] => {
  switch (action.type) {
    case 'ADD_GOAL':
      return state

    case 'MODIFY_TASK':
      return state.map(st => {

        if (st.id === action.payload.idGoal) {
          st.tasks = st.tasks.map(tk => {

            if (tk.id === action.payload.idTask) {
              return {...tk, text: action.payload.value}
            }

            return tk
          })
        }

        return st;
      })

    case 'DELETE_TASK':
      return state.map(st => {

        if (st.id === action.payload.idGoal) {
          st.tasks = st.tasks.filter(tk => tk.id !== action.payload.idTask)
        }

        return st;
      })

    case 'ADD_TASK':
      return state.map(st => {
        if (st.id === action.payload.idGoal) {
          st.tasks.push({
            id: action.payload.idNewTask,
            text: action.payload.value,
            status: 'ACTIVED'
          })
        }

        return st
      })

    case 'TOGGLE_COMPLETE_TASK':
      return state.map(st => {
        if (st.id === action.payload.idGoal) {
          st.tasks.forEach(tk => {
            if (tk.id === action.payload.idTask) {
              tk.status = (tk.status === 'ACTIVED' ? 'COMPLETED' : 'ACTIVED')
            }
          })
        }

        return st
      })

    case 'SET_GOALS':
      return action.payload.goals

    default:
      return state
  }
}
