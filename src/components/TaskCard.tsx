import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Task } from '../utils/interfaces/goal.interface';
import { GoalsContext } from '../context/GoalsProvider';
import Input from './Input';
import CheckBox from '@react-native-community/checkbox';
import { variablesStyle } from '../utils/theme/variables';

interface Props extends Task {
  idGoal: number;
  addTaskToDelete: (idTask: number) => void;
  quitTaskToDelete: (idTask: number) => void;
  taskToDelete: number[];
}

const TaskCard = ({ id, text, status, idGoal, addTaskToDelete, quitTaskToDelete, taskToDelete }: Props) => {
  const { toggleCompleteTask } =  useContext(GoalsContext)
  const [isActiveEdition, setIsActiveEdition] = useState(false)
  const [isCompleted, setIsCompleted] = useState(status === 'COMPLETED')
  const [isSelected, setIsSelected] = useState(false)

  const handleChangeCompleted = (state: boolean) => {
    setIsCompleted(state)
    toggleCompleteTask(idGoal, id, state)
  }

  useEffect(() => {
    setIsSelected(false)

    taskToDelete.forEach( idTask => {
      if (idTask === id) {
        setIsSelected(true)
      }
    })
  }, [taskToDelete, id])

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={ styles.container }
      onPress={() => quitTaskToDelete(id)}
      onLongPress={() => addTaskToDelete(id)}
      delayLongPress={600}
    >
      {/* Check */}
      <View style={ styles.checkCompleted }>
        <CheckBox
          disabled={false}
          value={isCompleted}
          onValueChange={handleChangeCompleted}
          tintColors={{'true': '#E12C2C'}}
        />
      </View>

      {/* Text */}
      <TouchableOpacity
        activeOpacity={0.8}
        style={{
          ...styles.textContainer,
          backgroundColor: (isSelected ? '#4366c73b' : 'transparent')
        }}
        onPress={() => setIsActiveEdition(true)}
        disabled={isCompleted}
      >
        <Input
          style={{
            ...styles.textInput,
            color: variablesStyle.inputTextColor
          }}
          text={text}
          idGoal={idGoal}
          idTask={id}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 13,
    paddingVertical: 10
  },
  checkCompleted: {
    marginRight: 2
  },
  textContainer: {
    flex: 1,
    marginTop: 2,
    paddingRight: 12,
    borderRadius: 5
  },
  textInput: {
    fontSize: 14,
    paddingLeft: 5,
    paddingRight: 0,
    paddingVertical: 0,
  }
});

export default TaskCard
