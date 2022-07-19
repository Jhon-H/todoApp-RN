import React, { useContext } from 'react'
import { TextInput } from 'react-native';
import { GoalsContext } from '../context/GoalsProvider';
import { useForm } from '../hooks/useForm';

interface Props {
  text: string;
  idGoal: number;
  idTask: number;
  style?: any;
  // rest?: any[]; // TODO: add rest params (rest vs ohter name) 
}

const Input = ({ text, idGoal, idTask, style = {} }: Props) => {
  const { text: textInput, form, handleInputChange } = useForm({ text })
  const { modifyTask } = useContext(GoalsContext)

  const handleChange = (value: string, field: keyof typeof form) => {
    handleInputChange(value, field)
    modifyTask(idGoal, idTask, value)
  }

  return (
    <TextInput
      //TODO: in the rest params
      multiline
      //TODO.

      style={style}
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
