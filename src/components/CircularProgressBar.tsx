import React from 'react'
import { StyleSheet, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg'

interface Props {
  progress: number;
  size: number;
  strokeWidth?: number;
  colorOneCircle?: string;
  colorTwoCircle?: string;
}

const CircularProgressBar = ({ size, strokeWidth = 5, colorOneCircle = '#B3B3F1', colorTwoCircle = '#443850', progress = 0.0 }: Props) => {
  const center = size / 2;
  const radius = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI  * radius;
  const offset = ((100 - Math.min(progress, 100)) / 100) * circumference;

  return (
    <Svg  style={ styles.svg } width={size} height={size}>
      <Circle
        cx={center}
        cy={center}
        r={radius}
        fill="none"
        stroke={colorOneCircle}
        strokeWidth={strokeWidth}
      />

      <Circle
        cx={center}
        cy={center}
        r={radius}
        fill="none"
        stroke={colorTwoCircle}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
      />
    </Svg>
  )
}

const styles = StyleSheet.create({
  svg: {
  }
});

export default CircularProgressBar
