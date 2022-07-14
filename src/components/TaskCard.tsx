import React, { useContext, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Task } from '../utils/interfaces/goal.interface';
import { GoalsContext } from '../context/GoalsProvider';
import Input from './Input';
import CheckBox from '@react-native-community/checkbox';

interface Props extends Task {
  idGoal: number;
}

const TaskCard = ({ id, text, status, idGoal }: Props) => {
  const { toggleCompleteTask } =  useContext(GoalsContext)
  const [isActiveEdition, setIsActiveEdition] = useState(false)
  const [isCompleted, setIsCompleted] = useState(status === 'COMPLETED')

  const handleChangeCompleted = (state: boolean) => {
    setIsCompleted(state)
    toggleCompleteTask(idGoal, id, state)
  }

  return (
    <View style={ styles.container }>
      {/* Check */}
      <View style={ styles.checkCompleted }>
        <CheckBox
          disabled={false}
          value={isCompleted}
          onValueChange={handleChangeCompleted}
          tintColors={{'true': '#D33F49'}}
        />
      </View>


      {/* Text */}
      <TouchableOpacity
        style={ styles.textContainer }
        activeOpacity={0.8}
        onPress={() => setIsActiveEdition(true)}
        disabled={isCompleted}
      >
        {
          isActiveEdition && !isCompleted
            ? <Input text={text} idGoal={idGoal} idTask={id} />
            : (
              <Text style={{
                ...styles.text,
                textDecorationLine: (isCompleted) ? 'line-through' : 'none'
              }}>{text}</Text>
            )
        }
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 6
  },
  checkCompleted: {
    marginRight: 2
  },
  textContainer: {
    flex: 1,
    marginTop: 4,
    paddingHorizontal: 3
  },
  text: {
    fontSize: 14
  }
});

export default TaskCard
