import React, { useState } from 'react'
import CheckBox from '@react-native-community/checkbox';

const Check = (completed: boolean = false) => {
  const [isCompleted, setIsCompleted] = useState(completed)

  return (
    <CheckBox
      disabled={false}
      value={isCompleted}
      onValueChange={(newValue) => setIsCompleted(newValue)}
      />
  )
}
export default Check
