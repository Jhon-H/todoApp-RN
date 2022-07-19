import React, { useContext } from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import { GoalsContext } from '../context/GoalsProvider'
import { getLargestIdTask } from '../utils/helpers/globalHelpers'
import { variablesStyle } from '../utils/theme/variables';
import { useForm } from '../hooks/useForm'

interface Props {
  idGoal: number;
}

const NewTaskCard = ({ idGoal }: Props) => {
  const { text, handleInputChange, resetForm } = useForm({ text: '' })
  const { addTask, goals } = useContext(GoalsContext)

  const finishWrite = (currentText: string) => {
    if (currentText.length) {
      let lasrgestIdTaskInCurrentGoal = getLargestIdTask(idGoal, goals);
      addTask(idGoal, lasrgestIdTaskInCurrentGoal  + 1, currentText)
    }

    resetForm()
  }

  return (
    <View style={ styles.container }>
      <TextInput
        style={{ color: variablesStyle.inputTextColor }}
        placeholder="[   ]  Add new note"
        value={text}
        onChangeText={(value) => handleInputChange(value, 'text')}
        onEndEditing={(e) => finishWrite(e.nativeEvent.text)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 17
  },
  textInput: {
    color: 'red'
  }
});

export default NewTaskCard
