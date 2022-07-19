import React from 'react'
import { Dimensions, StyleSheet, View } from 'react-native';

const { width: widthScreen } = Dimensions.get('window')

const TaskSeparator = () => {
  return (
    <View style={ styles.separator } />
  )
}

const styles = StyleSheet.create({
  separator: {
    borderBottomColor: 'rgba(0,0,0,0.7)',
    borderBottomWidth: StyleSheet.hairlineWidth,
    width: widthScreen - 24,
    marginHorizontal: 12,
    marginVertical: 2
  }
});

export default TaskSeparator
