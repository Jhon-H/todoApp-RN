import React, { useContext } from 'react'
import { TextInput } from 'react-native';
import { GoalsContext } from '../context/GoalsProvider';
import { useForm } from '../hooks/useForm';

interface Props {
  text: string;
  idGoal: number;
  idTask: number;
}

const Input = ({ text, idGoal, idTask }: Props) => {
  const { text: textInput, form, handleInputChange } = useForm({ text })
  const { modifyTask } = useContext(GoalsContext)

  const handleChange = (value: string, field: keyof typeof form) => {
    handleInputChange(value, field)
    modifyTask(idGoal, idTask, value)
  }

  return (
    <TextInput
      onChangeText={(value) => handleChange(value, 'text')}
      value={textInput}
      autoCorrect={false}
      autoCapitalize="none"
      keyboardType="default"
      placeholder="Write note"
    />
  )
}

export default Input
