import React from 'react'
import { StyleSheet, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg'

interface Props {
  progress: number;
}

const CircularProgressBar = ({ progress = 0.0 }: Props) => {
  return (
    <Svg style={styles.svg} viewBox="-1 -1 34 34">
      <Circle cx="16" cy="16" r="14" fill="none" stroke="#fff" strokeWidth="5"/>
      <Circle cx="16" cy="16" r="14" fill="none" stroke="dodgerblue" strokeDasharray="50 50" strokeDashoffset="10" strokeWidth="5"/>
    </Svg>
  )
}

const styles = StyleSheet.create({
  svg: {
    borderRadius: 300,
    width: 26,
    height: 26
  }
});

export default CircularProgressBar
