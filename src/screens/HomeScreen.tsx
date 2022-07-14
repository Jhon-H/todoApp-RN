import React, { useContext } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import CardGoal from '../components/CardGoal';
import { GoalsContext } from '../context/GoalsProvider';
import { styles } from '../utils/theme/appTheme';


const HomeScreen = () => {
  const { goals } = useContext(GoalsContext)

  return (
    <ScrollView style={ styles.globalMargin }>
      <Text style={ stylesScreen.title }>Goals</Text>

      {/* section to filter */}
      <View><Text>----</Text></View>

      {/* Goals */}
      <View style={ stylesScreen.goalsList }>
        {
          goals.map(goal => (
            <CardGoal
              key={goal.id}
              {...goal} //TODO: quitar tasks para no enviar props basura
            />
          ) )
        }
      </View>
    </ScrollView>
  )
}

const stylesScreen = StyleSheet.create({
  goalsList: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap'
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 20
  }
});

export default HomeScreen
