import React from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg'

const { width: widthScreen } = Dimensions.get('window')

interface Props {
  title: string;
  color: string;
}

const TaskScreenHeader = ({ title, color }: Props) => {
  return (
    <View style={ styles.container }>
      <Svg viewBox="0 0 1430 317" style={ styles.background }>
        <Path fill={color} fill-opacity="1" d="M0,192L80,208C160,224,320,256,480,256C640,256,800,224,960,213.3C1120,203,1280,213,1360,218.7L1440,224L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z" />
      </Svg>

      <Text style={ styles.title }>{title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container : {
    width: widthScreen,
    height: 91
  },
  background: {
    position: 'absolute',
    width: widthScreen,
    height: 91
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
    paddingVertical: 10,
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff'
  }
});

export default TaskScreenHeader
