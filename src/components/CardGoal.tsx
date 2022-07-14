import React, { useContext, useEffect, useState } from 'react'
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons'
import { convertDateToRelativeTime, getTotalCompletedTasks, getTotalTasks } from '../utils/helpers/globalHelpers';
import { Goal } from '../utils/interfaces/goal.interface';
import { variablesStyle } from '../utils/theme/variables';
import CircularProgressBar from './CircularProgressBar';
import { GoalsContext } from '../context/GoalsProvider';

const widthScreen = Dimensions.get('window').width

interface Props extends Goal { }

const CardGoal = ({ id, title, dateCreation, icon, color = '#5E2BFF'}: Props) => {
  const navigation = useNavigation()
  const sideLengthCard = (widthScreen - 2 * variablesStyle.globalMarginHorizontal - 10) / 2;

  const { goals } = useContext(GoalsContext)
  const [{ totalTasks, completedTasks }, setInfoTasks] = useState({
    totalTasks: 0,
    completedTasks: 0,
  })

  useEffect(() => {
    const totalTasks = getTotalTasks(id, goals)
    const completedTasks = getTotalCompletedTasks(id, goals)

    setInfoTasks({
      totalTasks,
      completedTasks
    })
  }, [goals, id])

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={{
        ...styles.card,
        backgroundColor: color,
        width: sideLengthCard,
        maxWidth: 200,
        height: sideLengthCard,
        maxHeight: 200,
      }}
      onPress={() => navigation.navigate('TasksScreen' as any, {
        idGoal: id,
        goalName: title,
        color
      })}
    >
      <View style={ styles.mainInfo }>
        {
          icon && (
            <Icon name={icon} size={25}/>
          )
        }
        <Text style={ styles.title }>{title}</Text>
        <Text style={ styles.date }>
          {convertDateToRelativeTime(dateCreation)}
          </Text>
      </View>

      <View style={ styles.additionalInfo }>
        <Text style={ styles.goalsResume}>
          {completedTasks} of {totalTasks}
        </Text>

        <CircularProgressBar progress={10} />
      </View>

    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    width: 150,
    height: 150,
    backgroundColor: 'orange',
    padding: 15,
    paddingBottom: 18,
    borderRadius: 15,
    marginVertical: 5
  },
  mainInfo: {
    flex: 1
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    lineHeight: 26,
    marginVertical: 4
  },
  date: {
    fontSize: 15,
    color: '#F0F8FF'
  },
  additionalInfo: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  goalsResume: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'
  }
});

export default CardGoal
